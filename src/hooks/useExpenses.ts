import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getExpenses } from '../store/ducks/expenses/services';
import { UseExpensesHook } from '../models/UseExpensesHook';
import { toggleLoader, alert } from '../store/ducks/app/actions';

const useExpenses = () => {
  const dispatch = useDispatch();

  const [hook, setHook] = useState<UseExpensesHook>({
    loading: false,
    data: [],
  });

  useEffect(() => {
    (async () => {
      dispatch(toggleLoader(true));
      setHook({ loading: true, data: []});

      try {
        // const expenses = await getExpenses();
        // if (expenses) {
        //   setHook({ loading: false, data: expenses });
        // }
      } catch (err) {
        dispatch(
          alert({
            className: 'bg-danger',
            text: 'Could not load expenses.',
          }),
        );
      } finally {
        dispatch(toggleLoader(false));
      }
    })();
  }, [dispatch]);

  return hook;
};

export { useExpenses };