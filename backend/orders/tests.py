import pytest
from rest_framework import status
from rest_framework.test import APIClient
from orders.models import Order
from order_lines.models import OrderLine


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def valid_order_data():
    return {
        "customer_id": "1000",
        "customer_PO": "2000",
        "order_date": "2024-01-01",
        "order_lines": [
            {
                "line_number": "11111",
                "part_number": "11111",
                "quantity": 1000,
                "ship_via": "air",
                "required_date": "2024-01-02",
                "status": "open",
                "factory": "HIT",
                "order": "3"
            },
            {
                "line_number": "22222",
                "part_number": "22222",
                "quantity": 500,
                "ship_via": "exp",
                "required_date": "2024-01-03",
                "status": "open",
                "factory": "HIT",
                "order": "3"
            }
        ]
    }


@pytest.fixture
def invalid_order_line_data():
    return {
        "customer_id": "1000",
        "customer_PO": "2000",
        "order_date": "2024-01-01",
        "order_lines": [
            {
                "line_number": "11111",
                "part_number": "11111",
                "quantity": 1000,  # wrong property name
                "ship_via": "air",
                "required_date": "2024-01-02",
                "status": "open",
                "factory": "HIT",
                "order": "3"
            },
            {
                "line_number": "22222",
                "part_number": "22222",
                "quantitys": 500,
                "ship_via": "exp",
                "required_date": "2024-01-03",
                "status": "open",
                "factory": "HIT",
                "order": "3"
            }
        ]
    }


@pytest.fixture
def invalid_order_data():
    return {
        "customer_id": "1000",
        "customer_PO": "2000",
        "ordered_date": "2024-01-01",  # wrong property name
        "order_lines": [
            {
                "line_number": "11111",
                "part_number": "11111",
                "quantity": 1000,
                "ship_via": "air",
                "required_date": "2024-01-02",
                "status": "open",
                "factory": "HIT",
                "order": "3"
            },
            {
                "line_number": "22222",
                "part_number": "22222",
                "quantity": 500,
                "ship_via": "exp",
                "required_date": "2024-01-03",
                "status": "open",
                "factory": "HIT",
                "order": "3"
            }
        ]
    }


@pytest.mark.django_db
def test_create_order_success(api_client, valid_order_data):
    response = api_client.post(
        '/orders/create/', valid_order_data, format='json')

    assert response.status_code == status.HTTP_201_CREATED

    # Verify the Order was created
    assert Order.objects.count() == 1

    # Verify the correct number of OrderLine instances were created
    assert OrderLine.objects.count() == 2


@pytest.mark.django_db
def test_create_order_order_line_failure(api_client, invalid_order_line_data):
    response = api_client.post(
        '/orders/create/', invalid_order_line_data, format='json')

    assert response.status_code == status.HTTP_400_BAD_REQUEST

    # Verify that no Order was created
    assert Order.objects.count() == 0

    # Verify that no OrderLine instances were created
    assert OrderLine.objects.count() == 0


@pytest.mark.django_db
def test_create_order_failure(api_client, invalid_order_data):
    response = api_client.post(
        '/orders/create/', invalid_order_data, format='json')

    assert response.status_code == status.HTTP_400_BAD_REQUEST

    # Verify that no Order was created
    assert Order.objects.count() == 0

    # Verify that no OrderLine instances were created
    assert OrderLine.objects.count() == 0


@pytest.mark.django_db
def test_create_order_with_partial_data(api_client):
    partial_data = {
        'customer_id': '1000',
        'customer_PO': 'PO12345'
        # Missing order_date and order_lines
    }
    response = api_client.post('/orders/create/', partial_data, format='json')

    assert response.status_code == status.HTTP_400_BAD_REQUEST

    # Verify that no Order or OrderLine instances were created
    assert Order.objects.count() == 0
    assert OrderLine.objects.count() == 0
