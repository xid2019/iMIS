from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import OrderSerializer
from order_lines.serializers import OrderLineSerializer
from .models import Order
from order_lines.models import OrderLine
from django.db import transaction
from django.db import connection


@api_view(['GET'])
def get_orders(request):
    # Execute raw SQL query
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT
                o.id AS order_id,
                o.customer_id,
                o.customer_PO,
                o.order_date,
                ol.id AS orderline_id,
                ol.line_number,
                ol.part_number,
                ol.quantity,
                ol.ship_via,
                ol.required_date,
                ol.status
            FROM
                orders_order AS o
            LEFT JOIN
                order_lines_orderline AS ol
            ON
                o.id = ol.order_id
        """)
        rows = cursor.fetchall()

    # # Process the rows into a format suitable for serialization
    # orders = {}
    # for row in rows:
    #     order_id = row[0]
    #     if order_id not in orders:
    #         orders[order_id] = {
    #             'id': order_id,
    #             'customer_id': row[1],
    #             'customer_PO': row[2],
    #             'order_date': row[3],
    #             'order_lines': []
    #         }
    #     if row[4]:  # Check if orderline_id is not null
    #         orders[order_id]['order_lines'].append({
    #             'id': row[4],
    #             'line_number': row[5],
    #             'part_number': row[6],
    #             'quantity': row[7],
    #             'ship_via': row[8],
    #             'required_date': row[9],
    #             'status': row[10]
    #         })

    # # Convert the dictionary into a list of orders
    # order_list = list(orders.values())

    # return Response(order_list)

    keys = [
        "order_id",
        "customer_id",
        "customer_PO",
        "order_date",
        "orderline_id",
        "line_number",
        "part_number",
        "quantity",
        "ship_via",
        "required_date",
        "status"
    ]
    result = [dict(zip(keys, value)) for value in rows]
    return Response(result)


@api_view(['GET'])
def get_order(request, order_id):
    # Execute raw SQL query
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT
                o.id AS order_id,
                o.customer_id,
                o.customer_PO,
                o.order_date,
                ol.id AS orderline_id,
                ol.line_number,
                ol.part_number,
                ol.quantity,
                ol.ship_via,
                ol.required_date,
                ol.status
            FROM
                orders_order AS o
            LEFT JOIN
                order_lines_orderline AS ol
            ON
                o.id = ol.order_id
            WHERE
                o.id = %s
        """, [order_id])
        rows = cursor.fetchall()
    # Process the rows into a format suitable for serialization
    orders = {}
    for row in rows:
        order_id = row[0]
        if order_id not in orders:
            orders[order_id] = {
                'id': order_id,
                'customer_id': row[1],
                'customer_PO': row[2],
                'order_date': row[3],
                'order_lines': []
            }
        if row[4]:  # Check if orderline_id is not null
            orders[order_id]['order_lines'].append({
                'id': row[4],
                'line_number': row[5],
                'part_number': row[6],
                'quantity': row[7],
                'ship_via': row[8],
                'required_date': row[9],
                'status': row[10]
            })

    # Convert the dictionary into a list of orders
    order_list = list(orders.values())

    return Response(order_list)


@api_view(['POST'])
def create_order(request):
    # Use a transaction to ensure atomicity
    with transaction.atomic():
        try:
            order_data = dict(
                customer_id=request.data['customer_id'],
                customer_PO=request.data['customer_PO'],
                order_date=request.data['order_date']
            )
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        order_serializer = OrderSerializer(data=order_data)
        if order_serializer.is_valid():
            # Save the order if the data is valid
            order = order_serializer.save()

            # Validate and save each order line
            order_lines = request.data['order_lines']
            order_lines_data = []
            for order_line_data in order_lines:
                # validate order_line_data
                order_line_data['order'] = order.id
                order_line_serializer = OrderLineSerializer(
                    data=order_line_data)
                if order_line_serializer.is_valid():
                    order_line_data['order'] = order
                    order_lines_data.append(OrderLine(**order_line_data))

                else:
                    # If any order line is invalid, roll back the inserted order and return an error response
                    transaction.set_rollback(True)
                    return Response(order_line_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            OrderLine.objects.bulk_create(order_lines_data)
            # Return the order data if everything is successful
            return Response(order_serializer.data, status=status.HTTP_201_CREATED)

        # If the order data is invalid, return an error response
        return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
