"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function generatePassword(
  length: number,
  opts: {
    uppercase: boolean;
    numbers: boolean;
    symbols: boolean;
    readable: boolean;
  }
) {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nums = "0123456789";
  const syms = "!@#$%^&*()-_=+[]{}<>?";
  let chars = "abcdefghijklmnopqrstuvwxyz";

  if (opts.uppercase) chars += upper;
  if (opts.numbers) chars += nums;
  if (opts.symbols) chars += syms;
  if (!chars) chars = upper;

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

function passwordStrength(password: string) {
  if (!password) return { entropy: 0, score: 0 };

  let charsetSize = 0;
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/\d/.test(password)) charsetSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32;

  const entropy = password.length * Math.log2(charsetSize);

  const score = Math.min(100, Math.round((entropy / 100) * 100));

  return { entropy, score };
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(14);
  const [uppercase, setuppercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [readable, setReadable] = useState(false);
  const [password, setPassword] = useState("");

  const handleGenerate = (newLength?: number) => {
    setLength((length) => newLength || length);
    setPassword(
      generatePassword(newLength || length, {
        uppercase,
        numbers,
        symbols,
        readable,
      })
    );
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    handleGenerate();
  }, [numbers, symbols, readable, uppercase]);

  return (
    <div className="grid grid-cols-3 gap-4">
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
              min={8}
              step={1}
              onValueChange={(val) => {
                handleGenerate(val[0]);
              }}
            />
          </div>

          <div className="flex flex-col gap-6">
            <label className="flex items-center gap-2">
              <Switch
                checked={uppercase}
                onCheckedChange={(val) => setuppercase(!!val)}
              />
              uppercase
            </label>
            <label className="flex items-center gap-2">
              <Switch
                checked={numbers}
                onCheckedChange={(val) => setNumbers(!!val)}
              />
              Numbers
            </label>
            <label className="flex items-center gap-2">
              <Switch
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
      <Card>
        <CardContent>
          <div className="overflow-hidden h-[90px] w-[180px] relative mx-auto mt-8">
            <div
              style={{
                transform: `rotate(${
                  45 + 1.8 * passwordStrength(password).score
                }deg)`,
              }}
              className="absolute top-0 left-0 w-[180px] h-[180px] transition-colors border-b-primary border-r-primary rounded-[50%] border-[10px] border-amber-50"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
