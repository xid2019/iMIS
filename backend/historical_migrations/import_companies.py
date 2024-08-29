import pandas as pd
import os
import django
import sys

# A: name = models.CharField(max_length=10)
# E: sold_to_address_line1 = models.TextField(null=True, blank=True)
# F: sold_to_address_line2 = models.TextField(null=True, blank=True)
# G: sold_to_address_line3 = models.TextField(null=True, blank=True)
# H: sold_to_address_line4 = models.TextField(null=True, blank=True)
# I: sold_to_contact_person = models.TextField(null=True, blank=True)
# J: sold_to_phone = models.TextField(null=True, blank=True)
# K: sold_to_email = models.TextField(null=True, blank=True)
# L: ship_to_address_line1 = models.TextField(null=True, blank=True)
# M: ship_to_address_line2 = models.TextField(null=True, blank=True)
# N: ship_to_address_line3 = models.TextField(null=True, blank=True)
# O: ship_to_address_line4 = models.TextField(null=True, blank=True)
# P: ship_to_contact_person = models.TextField(null=True, blank=True)
# Q: ship_to_phone = models.TextField(null=True, blank=True)
# R: ship_to_email = models.TextField(null=True, blank=True)
# S: dispatch_address_line1 = models.TextField(null=True, blank=True)
# T: dispatch_address_line2 = models.TextField(null=True, blank=True)
# U: dispatch_address_line3 = models.TextField(null=True, blank=True)
# V: dispatch_address_line4 = models.TextField(null=True, blank=True)
# W: dispatch_contact_person = models.TextField(null=True, blank=True)
# X: dispatch_phone = models.TextField(null=True, blank=True)
# Y: dispatch_email = models.TextField(null=True, blank=True)
# Z: plant_id = models.TextField(null=True, blank=True)


# Determine the path to the project root and add it to PYTHONPATH
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(project_root)

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# Initialize Django (only once)
django.setup()

from customers.models import Customer

df = pd.read_excel(
  'ComInfo.xlsx', 
  sheet_name='Customer',
  skiprows=2, 
  header=None, 
  usecols="A, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z",
)

error_rows = []
for i, row in df.iterrows():
    try:
        # Create and save the Customer instance
        customer = Customer(
            name=row[0] if not pd.isna(row[0]) else None,
            sold_to_address_line1=row[4] if not pd.isna(row[4]) else None,
            sold_to_address_line2=row[5] if not pd.isna(row[5]) else None,
            sold_to_address_line3=row[6] if not pd.isna(row[6]) else None,
            sold_to_address_line4=row[7] if not pd.isna(row[7]) else None,
            sold_to_contact_person=row[8] if not pd.isna(row[8]) else None,
            sold_to_phone=row[9] if not pd.isna(row[9]) else None,
            sold_to_email=row[10] if not pd.isna(row[10]) else None,
            ship_to_address_line1=row[11] if not pd.isna(row[11]) else None,
            ship_to_address_line2=row[12] if not pd.isna(row[12]) else None,
            ship_to_address_line3=row[13] if not pd.isna(row[13]) else None,
            ship_to_address_line4=row[14] if not pd.isna(row[14]) else None,
            ship_to_contact_person=row[15] if not pd.isna(row[15]) else None,
            ship_to_phone=row[16] if not pd.isna(row[16]) else None,
            ship_to_email=row[17] if not pd.isna(row[17]) else None,
            dispatch_address_line1=row[18] if not pd.isna(row[18]) else None,
            dispatch_address_line2=row[19] if not pd.isna(row[19]) else None,
            dispatch_address_line3=row[20] if not pd.isna(row[20]) else None,
            dispatch_address_line4=row[21] if not pd.isna(row[21]) else None,
            dispatch_contact_person=row[22] if not pd.isna(row[22]) else None,
            dispatch_phone=row[23] if not pd.isna(row[23]) else None,
            dispatch_email=row[24] if not pd.isna(row[24]) else None,
            plant_id=row[25] if not pd.isna(row[25]) else None
        )
        customer.save()
    except Exception as e:
        # Print the error message and continue with the next row
        error_rows.append({
            'row_num': i,
            'name': row[0], 
            'sold_to_address_line1': row[4], 
            'sold_to_address_line2': row[5],
            'sold_to_address_line3': row[6],
            'sold_to_address_line4': row[7],
            'sold_to_contact_person': row[8],
            'sold_to_phone': row[9],
            'sold_to_email': row[10],
            'ship_to_address_line1': row[11], 
            'ship_to_address_line2': row[12],
            'ship_to_address_line3': row[13],
            'ship_to_address_line4': row[14],
            'ship_to_contact_person': row[15],
            'ship_to_phone': row[16],
            'ship_to_email': row[17],
            'dispatch_address_line1': row[18], 
            'dispatch_address_line2': row[19],
            'dispatch_address_line3': row[20],
            'dispatch_address_line4': row[21],
            'dispatch_contact_person': row[22],
            'dispatch_phone': row[23],
            'dispatch_email': row[24],
            'plant_id': row[25],
            'error': e
        })
print(len(error_rows))
            

print("Data imported successfully!")
