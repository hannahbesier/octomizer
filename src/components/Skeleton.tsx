export default function Skeleton() {
  const skeletonStyle =
    "bg-linear-to-r from-background to-hover bg-size-[200%] animate-skeleton rounded-sm shadow-inset dark:shadow-insetDarkmode";
  return (
    <div className="ml-10 m-10 flex flex-col gap-10">
      <div className={` w-1/8 h-5 ${skeletonStyle}`}></div>
      <div className={` w-1/4 h-5 ${skeletonStyle}`}></div>
      <div className={` w-1/2 h-5 ${skeletonStyle}`}></div>
    </div>
  );
}
