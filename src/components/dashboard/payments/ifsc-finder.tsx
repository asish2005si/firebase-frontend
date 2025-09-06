
"use client";

import { useState, useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { bankData } from "@/lib/ifsc-data";
import { Search } from "lucide-react";

type IfscFinderProps = {
    form: UseFormReturn<any>;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

export function IfscFinder({ form, isOpen, setIsOpen }: IfscFinderProps) {
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [ifsc, setIfsc] = useState("");

  const states = useMemo(() => {
    if (!selectedBank) return [];
    return Object.keys(bankData[selectedBank] || {});
  }, [selectedBank]);

  const cities = useMemo(() => {
    if (!selectedBank || !selectedState) return [];
    return Object.keys(bankData[selectedBank]?.[selectedState] || {});
  }, [selectedBank, selectedState]);

  const branches = useMemo(() => {
    if (!selectedBank || !selectedState || !selectedCity) return [];
    return Object.keys(bankData[selectedBank]?.[selectedState]?.[selectedCity] || {});
  }, [selectedBank, selectedState, selectedCity]);

  const handleSelectBranch = (branch: string) => {
    setSelectedBranch(branch);
    const foundIfsc = bankData[selectedBank]?.[selectedState]?.[selectedCity]?.[branch];
    setIfsc(foundIfsc || "");
  }

  const handleApplyIfsc = () => {
    if (ifsc) {
        form.setValue("ifsc", ifsc, { shouldValidate: true });
        form.setValue("bankName", selectedBank, { shouldValidate: true });
        setIsOpen(false);
    }
  }

  const resetState = () => {
    setSelectedBank("");
    setSelectedState("");
    setSelectedCity("");
    setSelectedBranch("");
    setIfsc("");
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
        if(!open) resetState();
    }}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm">
            <Search className="mr-2 h-4 w-4"/>
            Find IFSC
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>IFSC Code Finder</DialogTitle>
          <DialogDescription>
            Find the IFSC code for any bank branch in India.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bank" className="text-right">Bank</Label>
            <Select onValueChange={setSelectedBank}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select Bank" />
                </SelectTrigger>
                <SelectContent>
                    {Object.keys(bankData).map(bank => (
                        <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="state" className="text-right">State</Label>
            <Select onValueChange={setSelectedState} disabled={!selectedBank}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                     {states.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="city" className="text-right">City</Label>
            <Select onValueChange={setSelectedCity} disabled={!selectedState}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                    {cities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="branch" className="text-right">Branch</Label>
             <Select onValueChange={handleSelectBranch} disabled={!selectedCity}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                     {branches.map(branch => (
                        <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>
          {ifsc && (
            <div className="text-center bg-muted p-4 rounded-md mt-4">
                <p className="text-sm font-medium text-muted-foreground">IFSC Code</p>
                <p className="text-lg font-bold text-primary">{ifsc}</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleApplyIfsc} disabled={!ifsc}>Select & Apply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
