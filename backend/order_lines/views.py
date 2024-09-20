from rest_framework.decorators import api_view
from .serializers import OrderLineSerializer
from .models import OrderLine
from order_lines.models import Order
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from orders.serializers import OrderSerializer
from .serializers import OrderLineSerializer
from datetime import datetime
from django.db import connection
from django.db.utils import OperationalError


@api_view(["GET"])
def get_order_lines(request):
    order_lines = OrderLine.objects.all()
    serializer = OrderLineSerializer(order_lines, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_order_line(request):
    # Extract query parameters
    customer_id = request.GET.get("customer_id")
    customer_po = request.GET.get("customer_po")
    line_number = request.GET.get("line_number")

    # Base SQL query
    sql_query = """
    SELECT
        o.id AS order_id,
        o.customer_id,
        o.customer_po,
        o.order_date,
        ol.id AS orderline_id,
        ol.line_number,
        ol.part_number,
        ol.description,
        ol.quantity,
        ol.ship_via,
        ol.balance,
        ol.required_date,
        ol.confirmed_date,
        ol.factory,
        ol.dwg_number,
        ol.material,
        ol.price,
        ol.revision,
        ol.weight,
        ol.status,
        ol.pay_terms,
        ol.unit
    FROM
        orders_order AS o
    JOIN
        order_lines_orderline AS ol
    ON
        o.id = ol.order_id
    """

    # Initialize an empty list to hold WHERE conditions
    where_clauses = []
    query_params = []

    # Add WHERE clauses based on available query parameters
    if customer_id:
        where_clauses.append("o.customer_id = %s")
        query_params.append(customer_id)

    if customer_po:
        where_clauses.append("o.customer_po = %s")
        query_params.append(customer_po)

    if line_number:
        where_clauses.append("ol.line_number = %s")
        query_params.append(line_number)

    # Combine the WHERE clauses
    if where_clauses:
        sql_query += "WHERE " + " AND ".join(where_clauses)

    sql_query += " LIMIT 1;"

    try:
        # Execute the query with parameters
        with connection.cursor() as cursor:
            cursor.execute(sql_query, query_params)
            rows = cursor.fetchall()

        keys = [
            "order_id",
            "customer_id",
            "customer_po",
            "order_date",
            "orderline_id",
            "line_number",
            "part_number",
            "description",
            "quantity",
            "ship_via",
            "balance",
            "required_date",
            "confirmed_date",
            "factory",
            "dwg_number",
            "material",
            "price",
            "revision",
            "weight",
            "status",
            "pay_terms",
            "unit",
        ]

        # Convert the result to a list of dictionaries
        result = [dict(zip(keys, row)) for row in rows]

        return Response(result)

    except OperationalError as e:
        return Response({"error": str(e)}, status=500)


@api_view(["POST"])
def create_order_line(request):
    customer_po = request.data.get("customer_po")
    order_line = {
        "line_number": request.data.get("line_number"),
        "part_number": request.data.get("part_number"),
        "description": request.data.get("description"),
        "quantity": request.data.get("quantity"),
        "ship_via": request.data.get("ship_via"),
        "required_date": request.data.get("required_date"),
        "confirmed_date": request.data.get("confirmed_date"),
        "factory": request.data.get("factory"),
        "balance": request.data.get("balance"),
        "status": "OPEN",
        "pay_terms": request.data.get("pay_terms"),
    }

    # Check if customer_po exists in the Order table
    order = Order.objects.filter(customer_po=customer_po).first()
    if order:
        order_line["order"] = order.id
        order_line_serializer = OrderLineSerializer(data=order_line)
        if order_line_serializer.is_valid():
            # Associate the order with the orderline
            order_line_serializer.save(order=order)
            return Response(order_line_serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            order_line_serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )
    else:
        # Use a transaction to ensure atomicity
        with transaction.atomic():
            try:
                order_data = dict(
                    customer_id=request.data["customer_id"],
                    customer_po=request.data["customer_po"],
                    buyer=request.data["buyer"],
                    order_date=datetime.today().strftime("%Y-%m-%d"),
                )
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            order_serializer = OrderSerializer(data=order_data)

            if order_serializer.is_valid():
                order = order_serializer.save()
            else:
                return Response(
                    order_serializer.errors, status=status.HTTP_400_BAD_REQUEST
                )
            order_line["order"] = order.id
            order_line_serializer = OrderLineSerializer(data=order_line)
            if order_line_serializer.is_valid():
                order_line = order_line_serializer.save(order=order)
            else:
                return Response(
                    order_line_serializer.errors, status=status.HTTP_400_BAD_REQUEST
                )
        return Response(order_line_serializer.data, status=status.HTTP_201_CREATED)


@api_view(["PUT"])
def update_order_line(request, order_line_id):
    try:
        # Retrieve the OrderLine by the order_id
        order_line = OrderLine.objects.get(id=order_line_id)
    except OrderLine.DoesNotExist:
        return Response(
            {"detail": "OrderLine not found"}, status=status.HTTP_404_NOT_FOUND
        )

    # Update the OrderLine with the data provided in the request
    serializer = OrderLineSerializer(order_line, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete_order_line(request, order_line_id):
    deleted, _ = OrderLine.objects.filter(id=order_line_id).delete()

    if deleted:
        return Response(
            {"detail": "OrderLine deleted successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )
    else:
        return Response(
            {"detail": "OrderLine not found"}, status=status.HTTP_404_NOT_FOUND
        )
