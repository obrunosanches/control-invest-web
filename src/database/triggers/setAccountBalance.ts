export const setAccountBalance = `
  CREATE OR REPLACE TRIGGER trigger_set_account_balance
  AFTER INSERT OR UPDATE OR DELETE
  ON public.transaction
  FOR EACH ROW EXECUTE FUNCTION set_account_balance_before_manipulate_transaction();
`