"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function generatePassword(
  length: number,
  opts: {
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
    readable: boolean;
  }
) {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const nums = "0123456789";
  const syms = "!@#$%^&*()-_=+[]{}<>?";
  let chars = "";

  if (opts.lowercase) chars += lower;
  if (opts.numbers) chars += nums;
  if (opts.symbols) chars += syms;
  if (!chars) chars = lower;

  if (opts.readable) {
    const vowels = "aeiou";
    const consonants = "bcdfghjklmnpqrstvwxyz";
    let pwd = "";
    for (let i = 0; i < length; i++) {
      pwd +=
        i % 2 === 0
          ? consonants[Math.floor(Math.random() * consonants.length)]
          : vowels[Math.floor(Math.random() * vowels.length)];
    }
    return pwd;
  }

  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(14);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [readable, setReadable] = useState(false);
  const [password, setPassword] = useState("");

  const handleGenerate = (newLength?: number) => {
    setLength((length) => newLength || length);
    setPassword(
      generatePassword(newLength || length, {
        lowercase,
        numbers,
        symbols,
        readable,
      })
    );
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Password Generator</CardTitle>
          <CardDescription>Generate strong, unique passwords</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2">
            <Button
              variant={readable ? "secondary" : "default"}
              onClick={() => {
                setReadable(false);
                handleGenerate();
              }}
            >
              Random
            </Button>
            <Button
              variant={readable ? "default" : "secondary"}
              onClick={() => {
                setReadable(true);
                handleGenerate();
              }}
            >
              Readable
            </Button>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              {length} characters
            </label>
            <Slider
              defaultValue={[length]}
              max={32}
              min={6}
              step={1}
              onValueChange={(val) => {
                handleGenerate(val[0]);
              }}
            />
          </div>

          <div className="flex flex-col gap-6">
            <label className="flex items-center gap-2">
              <Checkbox
                checked={lowercase}
                onCheckedChange={(val) => setLowercase(!!val)}
              />
              Lowercase
            </label>
            <label className="flex items-center gap-2">
              <Checkbox
                checked={numbers}
                onCheckedChange={(val) => setNumbers(!!val)}
              />
              Numbers
            </label>
            <label className="flex items-center gap-2">
              <Checkbox
                checked={symbols}
                onCheckedChange={(val) => setSymbols(!!val)}
              />
              Symbols
            </label>
          </div>
        </CardContent>
        <CardFooter />
      </Card>
      <Card>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={password}
              readOnly
              placeholder="Your password will appear here..."
            />
            <Button onClick={copyToClipboard}>Copy</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
