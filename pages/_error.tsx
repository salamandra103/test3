import Link from 'next/link'
import { Button, Result } from 'antd'
import { ResultStatusType } from 'antd/es/result'
import { useRouter } from 'next/router';


function Error({statusCode}: {statusCode: ResultStatusType}) {
  const router = useRouter();
  return (
    <>
      <Result
      status={statusCode}
      title={statusCode}
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={() => router.replace('/')}>Back on main page</Button>}/>
    </>
  )
}

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error;
