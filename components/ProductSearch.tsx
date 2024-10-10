import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function ProductSearch() {
  return (
    <div className="flex items-center gap-3 justify-between">
      <div className="flex items-center gap-3 w-full">
        <p className="text-sm">Search Products : </p>
        <Input
          className="text-sm font-semibold w-full max-w-2xl"
          placeholder="Search"
        />
      </div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
