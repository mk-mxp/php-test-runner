<?php

declare (strict_types = 1);

class ReverseStringTest extends PHPUnit\Framework\TestCase

{
    public static function setUpBeforeClass(): void
    {
        require_once 'ReverseString.php';
    }

    public function testEmptyString(): void
    {
        $this->assertEquals("", reverseString(""));
    }

    public function testWord(): void
    {
        $this->assertEquals("tobor", reverseString("robot"));
    }

    public function testCapitalizedWord(): void
    {
        $this->assertEquals("nemaR", reverseString("Ramen"));
    }

    public function testSentenceWithPunctuation(): void
    {
        $this->assertEquals("!yrgnuh m'I", reverseString("I'm hungry!"));
    }

    public function testPalindrome(): void
    {
        $this->assertEquals("racecar", reverseString("racecar"));
    }

    public function testEvenSizedWord(): void
    {
        $this->assertEquals("reward", reverseString("drawer"));
    }
}
