<?php

class HelloWorldTest extends PHPUnit\Framework\TestCase
{
    public static function setUpBeforeClass(): void
    {
        require_once 'HelloWorld.php';
    }

    public function testAssertEqualsPassing(): void
    {
        $this->assertEquals('Hello, World!', helloWorld());
    }

    public function testAssertEqualsFailing(): void
    {
        $this->assertEquals(1, 2);
    }

    public function testAssertNotEqualsPassing(): void
    {
        $this->assertNotEquals(1, 2);
    }

    public function testAssertNotEqualsFailing(): void
    {
        $this->assertNotEquals(1, 1);
    }

    public function testAssertEqualsCanonicalizingPassing(): void
    {
        $this->assertEqualsCanonicalizing([1], [1]);
    }

    public function testAssertEqualsCanonicalizingFailing(): void
    {
        $this->assertEqualsCanonicalizing([1], [2]);
    }

    public function testAssertEqualsWithDeltaPassing(): void
    {
        $this->assertEqualsWithDelta(1.0, 1.01, 0.1);
    }

    public function testAssertEqualsWithDeltaFailing(): void
    {
        $this->assertEqualsWithDelta(1.0, 1.5, 0.1);
    }

    public function testAssertTruePassing(): void
    {
        $this->assertTrue(true);
    }

    public function testAssertTrueFailing(): void
    {
        $this->assertTrue(false);
    }

    public function testAssertFalsePassing(): void
    {
        $this->assertFalse(false);
    }

    public function testAssertFalseFailing(): void
    {
        $this->assertFalse(true);
    }

    public function testAssertSamePassing(): void
    {
        $this->assertSame(2204, 2204);
    }

    public function testAssertSameFailing(): void
    {
        $this->assertSame('2204', 2204);
    }

    public function testAssertNotSamePassing(): void
    {
        $this->assertNotSame('2204', 2204);
    }

    public function testAssertNotSameFailing(): void
    {
        $this->assertNotSame(2204, 2204);
    }

    public function testAssertInstanceOfPassing(): void
    {
        $this->assertInstanceOf(Exception::class, new Exception);
    }

    public function testAssertInstanceOfFailing(): void
    {
        $this->assertInstanceOf(RuntimeException::class, new Exception);
    }

    public function testAssertContainsPassing(): void
    {
        $this->assertContains(4, [1, 2, 4]);
    }

    public function testAssertContainsFailing(): void
    {
        $this->assertContains(4, [1, 2, 3]);
    }

    public function testAssertNotContainsPassing(): void
    {
        $this->assertNotContains(4, [1, 2, 3]);
    }

    public function testAssertNotContainsFailing(): void
    {
        $this->assertNotContains(4, [1, 2, 4]);
    }

    public function testAssertEmptyPassing(): void
    {
        $this->assertEmpty([]);
    }

    public function testAssertEmptyFailing(): void
    {
        $this->assertEmpty([1, 2, 3]);
    }

    public function testAssertMatchesRegularExpressionPassing(): void
    {
        $this->assertMatchesRegularExpression('/foo/', 'foo');
    }

    public function testAssertMatchesRegularExpressionFailing(): void
    {
        $this->assertMatchesRegularExpression('/foo/', 'bar');
    }

    public function testAssertArrayHasKeyPassing(): void
    {
        $this->assertArrayHasKey('foo', ['foo' => 'baz']);
    }

    public function testAssertArrayHasKeyFailing(): void
    {
        $this->assertArrayHasKey('foo', ['bar' => 'baz']);
    }

    public function testAssertArrayNotHasKeyPassing(): void
    {
        $this->assertArrayNotHasKey('foo', ['bar' => 'baz']);
    }

    public function testAssertArrayNotHasKeyFailing(): void
    {
        $this->assertArrayNotHasKey('foo', ['foo' => 'baz']);
    }

    public function testThrownError(): void
    {
        throw new Exception('Testing Error');
    }
}
