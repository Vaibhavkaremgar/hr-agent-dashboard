import sqlite3
import psycopg2
import psycopg2.extras
from datetime import datetime

# ---------------------------------------------------
# CONFIG – UPDATE ONLY YOUR PASSWORD + SQLITE PATH
# ---------------------------------------------------

PG_HOST = "ep-purple-bush-a1vtpm0w-pooler.ap-southeast-1.aws.neon.tech"
PG_DB = "neondb"
PG_USER = "neondb_owner"
PG_PASSWORD = "npg_68YQEHrgLSnV"   # <--- CHANGE THIS ONLY

# ⚠ CHANGE THIS TO THE DB YOU WANT TO MIGRATE:
SQLITE_PATH = r"C:\Users\hp\hr-agent-dashboard\data\hirehero.db"
# (Set this to vbautomations.db if migrating that one)

# ---------------------------------------------------
print("\n🔌 Connecting to SQLite and Neon PostgreSQL...")
sqlite_conn = sqlite3.connect(SQLITE_PATH)
sqlite_cur = sqlite_conn.cursor()

pg_conn = psycopg2.connect(
    dbname=PG_DB,
    user=PG_USER,
    password=PG_PASSWORD,
    host=PG_HOST,
    sslmode="require"
)
pg_cur = pg_conn.cursor()
print("✅ Connected!\n")

# ---------------------------------------------------
# Helper: Convert DD/MM/YYYY → YYYY-MM-DD
# ---------------------------------------------------
def fix_date(value):
    """
    Convert dates like '18/11/2025' to '2025-11-18'.
    If not a date, return unchanged.
    """
    if isinstance(value, str):
        try:
            if "/" in value and value.count("/") == 2:
                return datetime.strptime(value, "%d/%m/%Y").strftime("%Y-%m-%d")
        except:
            pass
    return value

# ---------------------------------------------------
# Fetch SQLite tables
# ---------------------------------------------------
sqlite_cur.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = [t[0] for t in sqlite_cur.fetchall()]

print(f"📦 Found {len(tables)} tables:", tables, "\n")

# ---------------------------------------------------
# Loop through tables and migrate
# ---------------------------------------------------
for table in tables:
    print(f"🚀 Migrating table: {table}")

    # Read schema
    sqlite_cur.execute(f"PRAGMA table_info({table});")
    columns = sqlite_cur.fetchall()

    col_defs = []
    col_names = []

    for col in columns:
        name = col[1]
        dtype = col[2].upper()

        # SQLite → PostgreSQL type mapping
        if "INT" in dtype:
            dtype = "INTEGER"
        elif "CHAR" in dtype or "TEXT" in dtype:
            dtype = "TEXT"
        elif "DATE" in dtype or "TIME" in dtype:
            dtype = "TIMESTAMP"
        elif "REAL" in dtype or "FLOAT" in dtype:
            dtype = "DOUBLE PRECISION"
        else:
            dtype = "TEXT"

        col_defs.append(f'"{name}" {dtype}')
        col_names.append(name)

    # Drop existing table
    pg_cur.execute(f'DROP TABLE IF EXISTS "{table}" CASCADE;')

    # Create new table
    create_sql = f'CREATE TABLE "{table}" ({",".join(col_defs)});'
    pg_cur.execute(create_sql)

    # Fetch rows
    sqlite_cur.execute(f"SELECT * FROM {table}")
    rows = sqlite_cur.fetchall()

    if rows:
        placeholders = ",".join(["%s"] * len(col_names))
        insert_sql = f'INSERT INTO "{table}" ({",".join(col_names)}) VALUES ({placeholders})'

        fixed_rows = []
        for row in rows:
            fixed_row = tuple(fix_date(v) for v in row)
            fixed_rows.append(fixed_row)

        psycopg2.extras.execute_batch(pg_cur, insert_sql, fixed_rows, page_size=100)

    pg_conn.commit()
    print(f"   ✔ Migrated {len(rows)} rows\n")

# ---------------------------------------------------
print("🎉 ALL DONE! Database successfully migrated.")
sqlite_conn.close()
pg_conn.close()
