import { boolean, decimal, integer, pgEnum, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import type { PgColumnBuilderBase } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const transactionSlugEnum = pgEnum(
  'slug',
  ['expenses', 'earnings', 'expenses-transfer', 'earnings-transfer']
)

const DEFAULT_COLUMNS: Record<string, PgColumnBuilderBase> = {
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  archivedAt: timestamp('archived_at')
}

export const accountType = pgTable('account_type', {
  id: serial('id').primaryKey(),
  description: varchar('description', { length: 60 }).notNull(),
  ...DEFAULT_COLUMNS
})

export const transactionType = pgTable('transaction_type', {
  id: serial('id').primaryKey(),
  description: varchar('description', { length: 60 }).notNull(),
  slug: transactionSlugEnum('slug').unique().notNull(),
  ...DEFAULT_COLUMNS
})

export const category = pgTable('category', {
  id: serial('id').primaryKey(),
  typeId: integer('type_id').notNull().references(() => transactionType.id, {
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }),
  name: varchar('name', { length: 255 }).notNull(),
  ...DEFAULT_COLUMNS
})

export const subCategory = pgTable('sub_category', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id').notNull().references(() => category.id, {
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }),
  name: varchar('name', { length: 255 }).notNull(),
  ...DEFAULT_COLUMNS
})

export const account = pgTable('account', {
  id: serial('id').primaryKey(),
  accountTypeId: integer('account_type_id').notNull().references(() => accountType.id, {
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }),
  name: varchar('name', { length: 255 }).notNull(),
  initialBalance: decimal('initial_balance', { scale: 2 }),
  balance: decimal('balance', { scale: 2 }),
  ...DEFAULT_COLUMNS
})

export const transfer = pgTable('transfer', {
  id: serial('id').primaryKey(),
  accountFromId: integer('account_from_id').notNull().references(() => account.id, {
    onUpdate: 'cascade',
    onDelete: 'no action'
  }),
  accountToId: integer('account_to_id').notNull().references(() => account.id, {
    onUpdate: 'cascade',
    onDelete: 'no action'
  })
})

export const transaction = pgTable('transaction', {
  id: serial('id').primaryKey(),
  typeId: integer('type_id').notNull().references(() => transactionType.id, {
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }),
  categoryId: integer('category_id').notNull().references(() => category.id, {
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }),
  subCategoryId: integer('sub_category_id').notNull().references(() => subCategory.id, {
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }),
  accountId: integer('account_id').notNull().references(() => account.id, {
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }),
  transferId: integer('transfer_id').notNull().references(() => transfer.id, {
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }),
  description: varchar('description', { length: 60 }).notNull(),
  note: varchar('description', { length: 255 }).notNull(),
  value: decimal('value', { scale: 2 }),
  date: timestamp('date'),
  isActive: boolean('is_active'),
  mustIgnore: boolean('must_ignore'),
  ...DEFAULT_COLUMNS
})

// *********** relations *********** //

export const accountTypeRelations = relations(accountType, ({ many }) => ({
  accounts: many(account)
}))

export const transactionTypeRelations = relations(transactionType, ({ many }) => ({
  categories: many(category),
  transactions: many(transaction)
}))

export const categoryRelations = relations(category, ({ one, many }) => ({
  type: one(transactionType, {
    fields: [category.id],
    references: [transactionType.id]
  }),
  subCategories: many(subCategory),
  transactions: many(transaction)
}))

export const subCategoryRelations = relations(subCategory, ({ one, many }) => ({
  type: one(category, {
    fields: [subCategory.id],
    references: [category.id]
  }),
  transactions: many(transaction)
}))

export const accountRelations = relations(account, ({ one, many }) => ({
  type: one(accountType, {
    fields: [account.id],
    references: [accountType.id]
  }),
  account_to: many(transfer),
  account_from: many(transfer),
  transactions: many(transaction)
}))

export const transferRelations = relations(transfer, ({ one, many }) => ({
  account_to: one(account, {
    fields: [transfer.accountToId],
    references: [account.id]
  }),
  account_from: one(account, {
    fields: [transfer.accountFromId],
    references: [account.id]
  }),
  transactions: many(transaction)
}))

export const transactionRelations = relations(transaction, ({ one }) => ({
  type: one(transactionType, {
    fields: [transaction.typeId],
    references: [transactionType.id]
  }),
  category: one(category, {
    fields: [transaction.categoryId],
    references: [category.id]
  }),
  subCategory: one(subCategory, {
    fields: [transaction.subCategoryId],
    references: [subCategory.id]
  }),
  account: one(account, {
    fields: [transaction.accountId],
    references: [account.id]
  }),
  transfer: one(transfer, {
    fields: [transaction.transferId],
    references: [transfer.id]
  }),
}))
