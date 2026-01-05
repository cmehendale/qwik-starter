import type {
  BuildQueryResult,
  DBQueryConfig,
  ExtractTablesWithRelations,
} from "drizzle-orm";
import type { LibSQLDatabase, LibSQLTransaction } from "drizzle-orm/libsql";

import type schema from "./schema";

export type Database = LibSQLDatabase<typeof schema>;

export type Transaction = LibSQLTransaction<
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>;

export type DB = {
  db: Database;
  close: () => Promise<void>;
};

type Schema = typeof schema;
type TSchema = ExtractTablesWithRelations<Schema>;

export type IncludeRelation<TableName extends keyof TSchema> = DBQueryConfig<
  "one" | "many",
  boolean,
  TSchema,
  TSchema[TableName]
>["with"];

export type InferResultType<
  TableName extends keyof TSchema,
  With extends IncludeRelation<TableName> | undefined = undefined,
> = BuildQueryResult<
  TSchema,
  TSchema[TableName],
  {
    with: With;
  }
>;
