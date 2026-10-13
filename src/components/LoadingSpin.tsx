export default function LoadingSpin() {
    return(
        <div className=" h-7 w-7 bg-conic from-secondary to-primary animate-spin rounded-4xl">
            <div className="relative h-4 w-1 left-3 top-0 bg-primary border-primary border-2 rounded-b-md"/>
        </div>
    )
}