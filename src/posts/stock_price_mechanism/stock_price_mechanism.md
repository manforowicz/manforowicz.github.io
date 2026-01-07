---
title: Why does company performance influence stock price?
date: 2025-12-31
modified: 2026-01-07
---

As someone with no education in finance, I've been trying to find an answer to this question: why does a company's stock price rise when its profits rise?

I think I finally acquired a good understanding.
But first, let's look at some answers I've found unsatisfying.

## Unsatisfying answers

One unsatisfying answer goes something like this:

> A share (also known as a stock) represents ownership of a piece of a company.
> For example, if you own 50% of a company's shares, you own 50% of the company.
> When the company makes a profit, more people want to own it, so they buy its shares, which causes their price to rise.

Sure, if I own a physical bakery, I can sell bread and make money.
But a share just feels like a piece of paper with the company's logo on it. How can I use it to make money? I don't feel like a real owner of the company.
Why should its profits affect the value of my piece of paper?

Another unsatisfying answer goes something like this:

> Independent "pieces of paper", like Dogecoin, can have a price.
> When people believe its price will rise, they buy, hoping to sell later.
> But the wave of people buying _is_ what makes the price rise (by increasing demand and reducing supply).
>
> This self-fulfilling prophecy is one mechanism that links share price to company performance.
> The company does well, so people believe its share price will rise, due to past experience. Therefore, they all buy it, which causes the price to actually rise, reinforcing their belief.

Sure, I can see self-fulfilling prophecies influencing a share's price, but I doubt that's the only mechanism at play.

Why are company executives so obsessed about their company's shares, rather than shares of other companies?
Why don't companies go about their business, completely ignoring the existence of their shares?


## What makes shares more than pieces of paper

The first question we should ask is what do shares have that pieces of paper don't? These things:

- **Dividends**. Dividends are payments made by a company to its shareholders.
For example, it could pay $10 per share per year.

- **Share buybacks**. That's when a company decides to buy its own shares back from the open market, making them disappear. This exerts upward pressure on share price by increasing demand and reducing supply.

- **IPOs (initial public offerings)**. That's when a company decides to create new shares out of thin air and sell them. It's the opposite of buybacks.

- **Voting rights**. For each share you own, you get one vote on shareholder matters. Notably, you can elect board members. Board members are the people who control when the company does dividends, share buybacks, and IPOs. Board members also hire executives to run the company.

So how do these things affect share price?


## Majority shareholder incentives

Imagine you and your friends combined own 51% of a company's shares.
As greedy humans, how can you use this to make money?
Well, you have 51% of the vote, so you can control the board of directors by electing members that will do what you want.

You could tell the board to make the company give you a salary.
But it's illegal for the board to give you more favorable treatment
than other shareholders.

Instead, you tell the company to spend its income on dividends.
Since you own 51% of the shares, you'll get 51% of the dividends.
If you want, you can spend dividends on buying more shares.

Equivalently, you can make the company spend its income on buybacks.
These reduce the number of shares causing
your shares to become a greater fraction of the total.
If you want, you can sell some shares to lower your fraction to its previous value.
This gets you money, which is the same end result as dividends.
Confusingly, buybacks are sometimes taxed less than dividends.

Lastly, you are incentivized to make the board hire executives who will maximize profits so that more can be spent on dividends and buybacks.


## Minority shareholder incentives

Majority shareholders use their control of the company to earn money through dividends and buybacks. But to their annoyance, these leak some money to minority shareholders.
If you own 1% of a company's shares, you get 1% of the benefit of dividends and buybacks.

Companies with high expected future profits can spend more on dividends and buybacks.
So you buy shares from these companies, causing their price to rise.

Even if you don't hold long enough to receive dividends and buybacks,
you can sell to anyone else looking forward to them.
So the mere expectation of dividends and buybacks is enough to raise share prices.

Bubbles are when investors overestimate future profits, causing share price to rise,
causing people to falsely believe it will continue rising.


## What about companies without dividends or buybacks?

As of 2025, a few rapidly growing companies like Amazon haven't paid significant dividends or buybacks:

{% image "amazon_shareholder_returns.svg", "A graph of Amazon shareholder returns.", 70 %}

Why? Well, imagine again you're a majority shareholder.
If you believe the company can grow, you can tell the board to direct all income towards expansion.
You can even sell new shares through an IPO to raise more money for expansion.
Growth increases future income, allowing larger future dividends and buybacks.
In the meantime, share price rises as investors buy in anticipation of these dividends and buybacks.

For example, Apple Inc only ramped up dividends and buybacks when it surpassed $20 billion in yearly profits:

{% image "apple_shareholder_returns.svg", "A graph of Apple shareholder returns.", 70 %}

Most companies eventually spend almost all of their net income on dividends and buybacks. According to [this data](https://www.spglobal.com/spdji/en/documents/additional-material/sp-500-buyback.xlsx), in the 2018-2024 period, companies in the S&P 500 reported a total of $9,572 billion earnings and spent $9,316 billion of that on dividends and buybacks. So around 97% of net income was spent on dividends and buybacks.

Dividends and buybacks much higher than that would deprive the company of money it needs to operate, causing it to shrink.

(By the way, I made these graphs with SEC data I downloaded using a [Python library I made](https://github.com/manforowicz/sec_company_facts/).)


## Relationship to interest rates

When you put money in a bank, you get interest payments.
When you put money in shares, you get dividends and buybacks from profits.

*Earnings yield* is a bit like the "interest rate" of a share:

$$
\text{Earnings yield} = \frac{\text{Earnings per Share}}{\text{Share price}} = \frac{1}{\text{P/E Ratio}}
$$

Unlike interest, earnings yield is just a rough indicator.
A company can spend earnings on dividends, buybacks, or growth,
and there's no guarantee of future profits.

The recent S&P 500 P/E ratio of around 20 corresponds to an earnings yield of 5%.
Actual S&P 500 gains have been higher due to profit growth of the largest 500 companies.

When interest rates rise, people earn more from money in bank accounts.
This causes people to move money from shares to banks.
This lowers share price, causing share earnings yield to rise.
This mechanism makes earnings yields somewhat correlate to interest rates.


## Summary

Majority shareholders can make the board spend profits on dividends and buybacks,
which are mechanisms of giving money to shareholders.
The higher the profits, the more can be spent on future dividends or buybacks.
This causes people to buy shares when they see profits rise, which drives up their price.
