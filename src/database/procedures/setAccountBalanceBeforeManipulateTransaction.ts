export const setAccountBalanceBeforeManipulateTransaction = `
  CREATE OR REPLACE FUNCTION public.set_account_balance_before_manipulate_transaction()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
  DECLARE
    _record record := NEW;
    
    _slug transaction_type."slug"%type;
    _balance account."balance"%type;
  BEGIN
    IF (TG_OP = 'DELETE') THEN
      _record := OLD;
    END IF;
    
    SELECT slug FROM transaction_type WHERE id = _record.type_id INTO _slug;
    SELECT balance FROM account WHERE id = _record.account_id INTO _balance;
    
    
    IF (TG_OP = 'INSERT') THEN
      IF (_slug = 'expenses' OR _slug = 'expenses-transfer') THEN
        _balance := _balance - NEW.value;
      ELSE
        _balance := _balance + NEW.value;
      END IF;
      
      UPDATE account SET balance = _balance WHERE id = NEW.account_id;
    END IF;
    
    
    IF (TG_OP = 'UPDATE') THEN
      IF (_slug = 'expenses' OR _slug = 'expenses-transfer') THEN
        UPDATE account SET balance = balance + OLD.value WHERE id = OLD.account_id;
        UPDATE account SET balance = balance - NEW.value WHERE id = NEW.account_id;
      ELSE
        UPDATE account SET balance = balance - OLD.value WHERE id = OLD.account_id;
        UPDATE account SET balance = balance + NEW.value WHERE id = NEW.account_id;
      END IF;
    END IF;
    
    
    IF (TG_OP = 'DELETE') THEN
      IF (_slug = 'expenses' OR _slug = 'expenses-transfer') THEN
        _balance := _balance + OLD.value;
      ELSE
        _balance := _balance - OLD.value;
      END IF;
      
      UPDATE account SET balance = _balance WHERE id = OLD.account_id;
    END IF;
    
    RAISE NOTICE '% % %', TG_OP, _slug, _balance;
    
    return _record;
  END;
  $$;
`