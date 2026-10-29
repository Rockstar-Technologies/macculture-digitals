// Static hosts have no locale middleware, so the bare domain forwards to English.
export default function RootRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/en/" />
      <p>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/en/">Continue to Maculture Digitals</a>
      </p>
    </>
  );
}
