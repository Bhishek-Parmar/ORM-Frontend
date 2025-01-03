// "use client";

// import {
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";

// export default function BasicInfoFields({ form }) {
//   return (
//     <>
//        <FormField
//         control={form.control}
//         name="type"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Offer Type</FormLabel>
//             <Select onValueChange={field.onChange} defaultValue={field.value}>
//               <FormControl>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select discount type" />
//                 </SelectTrigger>
//               </FormControl>
//               <SelectContent>
//                 <SelectItem value="global">On bill</SelectItem>
//                 <SelectItem value="specific">For Dishes</SelectItem>
//               </SelectContent>
//             </Select>
//             <FormMessage />
//           </FormItem>
//         )}
//       />

//       <FormField
//         control={form.control}
//         name="name"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Name</FormLabel>
//             <FormControl>
//               <Input placeholder="Enter offer title" {...field} />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />

//       <FormField
//         control={form.control}
//         name="description"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Description</FormLabel>
//             <FormControl>
//               <Textarea 
//                 placeholder="Enter offer description"
//                 className="resize-none"
//                 {...field}
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     </>
//   );
// }

"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function BasicInfoFields({ form, setShowDishSelector }) {
  return (
    <>
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Offer Type</FormLabel>
            <Select
              onValueChange={(value) => {
                field?.onChange(value); // Update the form field value
                if (value === "specific") {
                  if(setShowDishSelector) setShowDishSelector(true); // Set to true when value is 'specific'
                } else {
                  if(setShowDishSelector) setShowDishSelector(false); // Set to false for other values
                }
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select discount type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="global">On bill</SelectItem>
                <SelectItem value="specific">For Dishes</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter offer title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter offer description"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
