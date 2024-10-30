from rest_framework.decorators import api_view
from invoices.utils import create_invoice_excel
from rest_framework.response import Response
from rest_framework import status
from order_lines.models import OrderLine
from django.db import transaction


@api_view(["POST"])
def create_invoice(request):
    order_lines = request.data["orderLineData"]
    orderline_ids = []
    for line in order_lines:
        if 'surcharge_line' not in line or line['surcharge_line'] == False:
            orderline_ids.append(line["orderline_id"])

    try:
        with transaction.atomic():
            # Update order lines status to 'INVOICED'
            updated_count = OrderLine.objects.filter(id__in=orderline_ids).update(
                status="INVOICED"
            )
            if updated_count != len(orderline_ids):
                raise Exception("Not all order lines were updated successfully.")

            create_invoice_excel(request.data)

    except Exception as e:
        # Rollback is automatically handled by transaction.atomic() if any exception occurs
        return Response(
            {"detail": f"Failed to process invoice creation: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    return Response(
        {"detail": "Invoice created and statuses updated successfully."},
        status=status.HTTP_201_CREATED,
    )
