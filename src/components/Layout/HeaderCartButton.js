import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);

  const { items } = useContext(CartContext);

  const numberOfCartItems = items.reduce(
    (previous, item) => previous + item.amount,
    0
  );

  const buttonClasses = `${classes.button} ${
    buttonIsHighlighted ? classes.bump : ''
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setButtonIsHighlighted(true);

    const timeout = setTimeout(() => {
      setButtonIsHighlighted(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [items]);

  return (
    <button className={buttonClasses} onClick={props.onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>You Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
