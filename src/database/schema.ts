import { boolean, decimal, integer, pgEnum, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const transactionSlugEnum = pgEnum(
  'slug',
  ['expenses', 'earnings', 'expenses-transfer', 'earnings-transfer']
)

export const accountType = pgTable('account_type', {
  id: serial('id').primaryKey(),
  description: varchar('description', { length: 60 }).notNull(),
  created_at: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow(),
  archived_at: timestamp('archived_at', { mode: 'date', withTimezone: true })
})

export const transactionType = pgTable('transaction_type', {
  id: serial('id').primaryKey(),
  description: varchar('description', { length: 60 }).notNull(),
  slug: transactionSlugEnum('slug').unique().notNull(),
  created_at: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow(),
  archived_at: timestamp('archived_at', { mode: 'date', withTimezone: true })
})

export const category = pgTable('category', {
  id: serial('id').primaryKey(),
  type_id: integer('type_id').notNull().references(() => transactionType.id, {
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }),
  name: varchar('name', { length: 255 }).notNull(),
  created_at: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow(),
  archived_at: timestamp('archived_at', { mode: 'date', withTimezone: true })
})

export const subCategory = pgTable('sub_category', {
  id: serial('id').primaryKey(),
  category_id: integer('category_id').notNull().references(() => category.id, {
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }),
  name: varchar('name', { length: 255 }).notNull(),
  created_at: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow(),
  archived_at: timestamp('archived_at', { mode: 'date', withTimezone: true })
})

export const account = pgTable('account', {
  id: serial('id').primaryKey(),
  account_type_id: integer('account_type_id').notNull().references(() => accountType.id, {
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }),
  name: varchar('name', { length: 255 }).notNull(),
  initial_balance: decimal('initial_balance', { scale: 2 }),
  balance: decimal('balance', { scale: 2 }),
  created_at: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow(),
  archived_at: timestamp('archived_at', { mode: 'date', withTimezone: true })
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
  type_id: integer('type_id').notNull().references(() => transactionType.id, {
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }),
  category_id: integer('category_id').notNull().references(() => category.id, {
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }),
  sub_category_id: integer('sub_category_id').notNull().references(() => subCategory.id, {
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }),
  account_id: integer('account_id').notNull().references(() => account.id, {
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }),
  transfer_id: integer('transfer_id').references(() => transfer.id, {
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }),
  description: varchar('description', { length: 60 }).notNull(),
  note: varchar('note', { length: 255 }),
  value: decimal('value', { scale: 2 }).notNull(),
  date: timestamp('date', { mode: 'date', withTimezone: true }).notNull(),
  is_active: boolean('is_active').default(true),
  must_ignore: boolean('must_ignore').default(false),
  created_at: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow(),
  archived_at: timestamp('archived_at', { mode: 'date', withTimezone: true })
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
    fields: [category.type_id],
    references: [transactionType.id]
  }),
  subCategories: many(subCategory),
  transactions: many(transaction)
}))

export const subCategoryRelations = relations(subCategory, ({ one, many }) => ({
  category: one(category, {
    fields: [subCategory.category_id],
    references: [category.id]
  }),
  transactions: many(transaction)
}))

export const accountRelations = relations(account, ({ one, many }) => ({
  type: one(accountType, {
    fields: [account.account_type_id],
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
    fields: [transaction.type_id],
    references: [transactionType.id]
  }),
  category: one(category, {
    fields: [transaction.category_id],
    references: [category.id]
  }),
  subCategory: one(subCategory, {
    fields: [transaction.sub_category_id],
    references: [subCategory.id]
  }),
  account: one(account, {
    fields: [transaction.account_id],
    references: [account.id]
  }),
  transfer: one(transfer, {
    fields: [transaction.transfer_id],
    references: [transfer.id]
  }),
}))
