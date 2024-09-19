from rest_framework.decorators import api_view
from invoices.utils import create_invoice_excel
from rest_framework.response import Response
from rest_framework import status


@api_view(["POST"])
def create_invoice(request):
    try:
        create_invoice_excel(request.data)

    except Exception as e:
        return Response(
            {"detail": f"Failed to create Excel: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    return Response(status=status.HTTP_201_CREATED)
