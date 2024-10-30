import pandas as pd
import os
import django
import sys

# Determine the path to the project root and add it to PYTHONPATH
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(project_root)

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# Initialize Django (only once)
django.setup()

from orders.models import Order
from order_lines.models import OrderLine
from parts.models import Part



dfs = pd.read_excel(
  'PO Log.xlsx', 
  sheet_name=None,
  skiprows=2, 
  header=None, 
  usecols="A, B, C, D, E, F, G, H, I, J, K, L, M, N",
)

# import order data
po_to_id = {}
error_rows = []
for sheet_name, df in dfs.items():
    df.columns = range(df.shape[1])
    print(f"Processing order data sheet: {sheet_name}")
    for i, row in df.iterrows():
        try:
            # Create and save the Order instance
            customer_po=row[1] if not pd.isna(row[1]) else None
            if customer_po not in po_to_id: 
                order = Order(
                    customer_id=row[0] if not pd.isna(row[0]) else None,
                    customer_po=row[1] if not pd.isna(row[1]) else None,
                    order_date=row[5] if not pd.isna(row[2]) else None,
                    buyer=row[10] if not pd.isna(row[3]) else None
                )
                order.save()
                po_to_id[customer_po] = order.id

        except Exception as e:
            # Print the error message and continue with the next row
            error_rows.append({
                'row_num': i,
                'customer_id': row[0], 
                'customer_po': row[1], 
                'order_date': row[5],
                'buyer': row[10],
                'error': e
            })
print("Order data imported successfully!")

# import order line data
for sheet_name, df in dfs.items():
    df = df.apply(lambda x: x.map(lambda y: None if pd.isna(y) else y))
    df.columns = range(df.shape[1])
    print(f"Processing order line data sheet: {sheet_name}")
    for i, row in df.iterrows():
        try:
            part_number = row[3] if not pd.isna(row[3]) else None
            part = None
            
            # Look up the Part by part_number if it exists
            if part_number:
                part = Part.objects.filter(part_number=part_number).first()

            # Create and save the Order Line instance
            order_line = OrderLine(
                line_number=row[2] if not pd.isna(row[2]) else None,
                part_number=row[3] if not pd.isna(row[3]) else None,
                description=row[4] if not pd.isna(row[4]) else None,
                quantity=row[6] if not pd.isna(row[6]) else None,
                ship_via=row[7] if not pd.isna(row[7]) else None,
                required_date=row[8] if not pd.isna(row[8]) else None,
                confirmed_date=row[9] if not pd.isna(row[9]) else None,
                factory=part.factory if part else None,
                balance=row[12] if not pd.isna(row[12]) else None,
                status=row[13] if not pd.isna(row[13]) else None,
                order_id=po_to_id[row[1]],
                dwg_number=part.dwg_number if part else None,
                material=part.material if part else None,
                revision=part.revision if part else None,
                weight=part.weight if part else None
            )
            order_line.save()

        except Exception as e:
            # Print the error message and continue with the next row
            error_rows.append({
                'row_num': i,
                'line_number': row[2], 
                'part_number': row[3], 
                'description': row[4],
                'quantity': row[6],
                'ship_via': row[7],
                'required_date': row[8],
                'confirmed_date': row[9],
                'factory': part.factory,
                'balance': row[12],
                'status': row[13],
                'order_id': po_to_id[row[1]],
                'dwg_number': part.dwg_number,
                'material': part.material,
                'revision': part.revision,
                'weight': part.weight,
                'error': e
            })
                
print("Order line data imported successfully!")
