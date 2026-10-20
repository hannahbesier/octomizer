import Link from 'next/link'
export default function NotFound() {
  return (
    <div className='flex flex-col flex-1 w-full items-center justify-center gap-4'>
      <h1 className='text-xl'>404 | Not Found</h1>
      <p>Could not find requested resource</p>
      <Link className='text-primaryLight underline' href="/">Return Home</Link>
    </div>
  )
}