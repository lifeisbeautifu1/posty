import { useLocation } from 'react-router-dom';
export const useQuery = () => new URLSearchParams(useLocation().search);


export const showAvatar = (messages, sender, i) => {
  //   console.log(messages[i].content);
  if (i === 0) return true;
  else if (messages[i - 1].sender._id !== sender._id) return true;
  return false;
};