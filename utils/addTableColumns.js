import mssql from 'mssql';

const addTableColumns = (tableSchema) => {
  return tableSchema.map((column) => {
    const { table, name, type, size, isNullable } = column;
    return table.columns.add(
      name,
      (type === 'VarChar' && mssql.VarChar(size)) ||
        (type === 'Int' && mssql.Int) ||
        (type === 'Bit' && mssql.Bit) ||
        (type === 'DateTime' && mssql.DateTime),
      {
        nullable: isNullable,
      }
    );
  });
};

export { addTableColumns };
