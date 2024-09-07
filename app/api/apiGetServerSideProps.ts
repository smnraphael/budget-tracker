import { getAuth, buildClerkProps } from '@clerk/nextjs/server';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = getAuth(ctx.req);

  if (!userId) {
    // handle user is not signed in.
  }

  // Load any data your application needs for the page using the userId

  return { props: { ...buildClerkProps(ctx.req) } };
};
