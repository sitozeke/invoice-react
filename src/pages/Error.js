import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

 

function ErrorPage() {
  const error = useRouteError();

  // console.log(JSON.parse(error.data));

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  return (
    <>
      <MainNavigation />
      <main>
      <p>{title}</p>
        <p>{message}</p>
        </main>
      
    </>
  );
}

export default ErrorPage;