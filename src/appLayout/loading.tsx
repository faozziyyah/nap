import { PropagateLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <PropagateLoader color="#1363DF" />
    </div>
  );
};

export default Loading;
