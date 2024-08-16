import pytest
from rest_framework import status
from rest_framework.test import APIClient
from .models import Order, OrderLine


@pytest.mark.django_db
class TestGetOrderLines:

    @pytest.fixture
    def api_client(self):
        return APIClient()

    @pytest.fixture
    def order(self):
        return Order.objects.create(customer_id="1000", customer_PO="2000", order_date="2024-01-01")

    @pytest.fixture
    def order_lines(self, order):
        return [
            OrderLine.objects.create(
                order=order,
                line_number="11111",
                part_number="11111",
                quantity=1000,
                ship_via="air",
                required_date="2024-01-02",
                status="open",
                factory="HIT"
            ),
            OrderLine.objects.create(
                order=order,
                line_number="22222",
                part_number="22222",
                quantity=500,
                ship_via="exp",
                required_date="2024-01-03",
                status="open",
                factory="HIT"
            )
        ]

    def test_get_order_lines(self, api_client, order_lines):
        response = api_client.get('/order_lines/')
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 2
        assert response.data[0]['line_number'] == "11111"
        assert response.data[1]['line_number'] == "22222"


@pytest.mark.django_db
class TestOrderLineCreation:

    @pytest.fixture
    def api_client(self):
        return APIClient()

    @pytest.fixture
    def order(self):
        # Creating a sample order to associate with order lines
        return Order.objects.create(
            customer_id="1000",
            customer_PO="2000",
            order_date="2024-01-01"
        )

    @pytest.fixture
    def valid_order_line_data(self, order):
        return {
            "order": order.id,
            "line_number": "33333",
            "part_number": "33333",
            "quantity": 200,
            "ship_via": "sea",
            "required_date": "2024-01-04",
            "status": "open",
            "factory": "HIT"
        }

    @pytest.fixture
    def invalid_order_line_data(self):
        return {
            "line_number": "33333",
            # Missing required fields
        }

    def test_create_order_line_success(self, api_client, valid_order_line_data):
        response = api_client.post(
            '/order_lines/create/', valid_order_line_data, format='json')
        assert response.status_code == status.HTTP_201_CREATED

        # Verify the OrderLine was created
        assert OrderLine.objects.count() == 1
        order_line = OrderLine.objects.first()
        assert order_line.line_number == "33333"
        assert order_line.part_number == "33333"

    def test_create_order_line_failure(self, api_client, invalid_order_line_data):
        response = api_client.post(
            '/order_lines/create/', invalid_order_line_data, format='json')
        assert response.status_code == status.HTTP_400_BAD_REQUEST

        # Verify that no OrderLine was created
        assert OrderLine.objects.count() == 0


@pytest.mark.django_db
class TestOrderLineUpdate:

    @pytest.fixture
    def api_client(self):
        return APIClient()

    @pytest.fixture
    def order(self):
        # Creating a sample order to associate with order lines
        return Order.objects.create(
            customer_id="1000",
            customer_PO="2000",
            order_date="2024-01-01"
        )

    @pytest.fixture
    def order_line(self, order):
        # Creating a sample order line to be updated in the tests
        return OrderLine.objects.create(
            order=order,
            line_number="11111",
            part_number="11111",
            quantity=100,
            ship_via="air",
            required_date="2024-01-02",
            status="open",
            factory="HIT"
        )

    @pytest.fixture
    def valid_update_data(self):
        return {
            "line_number": "22222",
            "part_number": "22222",
            "quantity": 500,
            "ship_via": "exp",
            "required_date": "2024-01-05",
            "status": "closed"
        }

    @pytest.fixture
    def invalid_update_data(self):
        return {
            "quantity": "invalid",  # Quantity should be an integer
        }

    def test_update_order_line_success(self, api_client, order_line, valid_update_data):
        response = api_client.put(
            f'/order_lines/update/{order_line.id}/', valid_update_data, format='json')
        assert response.status_code == status.HTTP_200_OK

        # Verify the OrderLine was updated
        order_line.refresh_from_db()
        assert order_line.line_number == "22222"
        assert order_line.part_number == "22222"
        assert order_line.quantity == 500
        assert order_line.ship_via == "exp"
        assert order_line.required_date.strftime('%Y-%m-%d') == "2024-01-05"
        assert order_line.status == "closed"

    def test_update_order_line_failure(self, api_client, order_line, invalid_update_data):
        response = api_client.put(
            f'/order_lines/update/{order_line.id}/', invalid_update_data, format='json')
        assert response.status_code == status.HTTP_400_BAD_REQUEST

        # Verify that the OrderLine was not updated
        order_line.refresh_from_db()
        assert order_line.quantity == 100


@pytest.mark.django_db
class TestOrderLineDeletion:

    @pytest.fixture
    def api_client(self):
        return APIClient()

    @pytest.fixture
    def order(self):
        # Creating a sample order to associate with order lines
        return Order.objects.create(
            customer_id="1000",
            customer_PO="2000",
            order_date="2024-01-01"
        )

    @pytest.fixture
    def order_line(self, order):
        # Creating a sample order line that will be deleted in the tests
        return OrderLine.objects.create(
            order=order,
            line_number="11111",
            part_number="11111",
            quantity=100,
            ship_via="air",
            required_date="2024-01-02",
            status="open",
            factory="HIT"
        )

    def test_delete_order_line_success(self, api_client, order_line):
        response = api_client.delete(f'/order_lines/delete/{order_line.id}/')
        assert response.status_code == status.HTTP_204_NO_CONTENT

        # Verify the OrderLine was deleted
        assert OrderLine.objects.filter(id=order_line.id).count() == 0

    def test_delete_order_line_not_found(self, api_client):
        # Trying to delete an OrderLine that doesn't exist
        non_existent_id = 9999
        response = api_client.delete(f'/order_lines/delete/{non_existent_id}/')
        assert response.status_code == status.HTTP_404_NOT_FOUND
        assert response.data['detail'] == "OrderLine not found"
