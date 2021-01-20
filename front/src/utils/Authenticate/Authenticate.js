import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

export default function(ComposedComponent) {

  
  const Authenticate = (props) => {

    const { user } = useSelector(state => state);

    useEffect(() => {
      // если пользователь не зарегистрирован, или не прошел проверку, то его перенаправляют на путь join
      if (!user) {
        props.history.push('/join');
      }
    }, [props.history, user])

    return (
      <ComposedComponent { ...props } />
    )
  }

  return Authenticate;
}
