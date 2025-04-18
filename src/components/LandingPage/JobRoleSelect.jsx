import React from 'react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const JobRoleSelect = ({ onSelect }) => {
  return (
    <div className="w-full max-w-sm">
      <Select onValueChange={onSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a job role" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="software-engineer">Software Engineer</SelectItem>
            <SelectItem value="product-manager">Product Manager</SelectItem>
            <SelectItem value="ux-designer">UX Designer</SelectItem>
            <SelectItem value="data-scientist">Data Scientist</SelectItem>
            <SelectItem value="marketing-manager">Marketing Manager</SelectItem>
            <SelectItem value="sales-representative">Sales Representative</SelectItem>
            <SelectItem value="customer-success">Customer Success Manager</SelectItem>
            <SelectItem value="hr-manager">HR Manager</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default JobRoleSelect;
