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



dfs = pd.read_excel(
  'PO Log.xlsx', 
  sheet_name=None,
  skiprows=2, 
  header=None, 
  usecols="A, B, C, D, E, F, G, H, I, J, K, L, M, N",
)

# import order data
def helper():
    po_to_id = {}
    error_rows = []
    for sheet_name, df in dfs.items():
        df.columns = range(df.shape[1])
        print(f"Processing sheet: {sheet_name}")
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
                print({
                    'row_num': i,
                    'customer_id': row[0], 
                    'customer_po': row[1], 
                    'order_date': row[5],
                    'buyer': row[10],
                    'error': e
                })
                return
helper()
            
print("Data imported successfully!")
