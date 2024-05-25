
export default function validate(obj, setError) {
  if (obj?.price > 1000000 || obj?.price <= 0) {
    setError("Price should be less than 1000000 and more than 0");
    return false;
  }

  if (obj?.quantity > 500 || obj?.quantity <= 0) {
    setError("Qunatity should be more than 0 and less than 500");
    return false;
  }

  if (obj?.additionalMessage.length > 100) {
    setError("additional message can not be more than 100 symbols");
    return false;
  }

  if (obj?.name.length > 100) {
    setError("name should not be more than 100 symbols");
    return false;
  }

  if (obj.itemId.length > 20) {
    setError("itemid should be less than 20 synbols");
    return false;
  }

  return true;
} 