import {
  SelectTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectLabel,
} from "./ui/select";

// SelectCategory component with onChange prop
export function SelectCategory({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="All" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="electronics">Electronics</SelectItem>
          <SelectItem value="jewelery">Jewelery</SelectItem>
          <SelectItem value="men's clothing">Men's clothing</SelectItem>
          <SelectItem value="women's clothing">Women's clothing</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

// Sort component with onChange prop
export function Sort({ onChange }: { onChange: (value: string) => void }) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Price" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="none">None</SelectItem>
          <SelectItem value="descending">High to low</SelectItem>
          <SelectItem value="ascending">Low to high</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
