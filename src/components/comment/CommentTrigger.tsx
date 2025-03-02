import { Input } from "../ui/input";

export function CommentTrigger() {
  return (
    <div className="w-full">
      <Input
        className="w-full p-2 cursor-pointer text-custom-5 bg-custom-3 text-lg border-custom-4 focus:border-custom-2 focus:outline-none"
        placeholder="Write your comment"
        readOnly
      />
    </div>
  );
}
