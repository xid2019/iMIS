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
  usecols="A, B, C, D, E, F, H, K, L, M, P",
)

# import order data
error_rows = []
for sheet_name, df in dfs.items():
    df.columns = range(df.shape[1])
    print(f"Processing sheet: {sheet_name}")
    for i, row in df.iterrows():
        try:
            # Create and save the Part instance
            part = Part(
                customer_id=row[0] if not pd.isna(row[0]) else None,
                part_number=row[1] if not pd.isna(row[1]) else None,
                dwg_number=row[2] if not pd.isna(row[2]) else None,
                revision=row[3] if not pd.isna(row[3]) else None,
                description=row[4] if not pd.isna(row[4]) else None,
                price=row[5] if not pd.isna(row[5]) else None,
                cost=row[6] if not pd.isna(row[6]) else None,
                material=row[7] if not pd.isna(row[7]) else None,
                weight=row[8] if not pd.isna(row[8]) else None,
                order_quantity=row[9] if not pd.isna(row[9]) else None,
                factory=row[10] if not pd.isna(row[10]) else None
            )
            part.save()
        except Exception as e:
            # Print the error message and continue with the next row
            error_rows.append({
                'row_num': i,
                'customer_id': row[0], 
                'part_number': row[1], 
                'dwg_number': row[2],
                'revision': row[3],
                'description': row[4],
                'price':row[5],
                'cost':row[6],
                'material':row[7],
                'weight':row[8],
                'order_quantity':row[9],
                'factory': row[10],
                'error': e
            })
            
print("Data imported successfully!")
