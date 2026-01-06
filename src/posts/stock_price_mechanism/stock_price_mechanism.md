---
title: Why does company performance influence stock price?
date: 2025-12-31
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

> Pieces of paper, like Dogecoin, can have a price.
> When people believe its price will rise, they buy, hoping to sell later.
> But the wave of people buying _is_ what makes the price rise (by increasing demand and reducing supply).
>
> This self-fulfilling prophecy is one mechanism that links share price to company performance.
> The company does well, so people believe its share price will rise, due to past experience. Therefore, they all buy it, which causes the price to actually rise, reinforcing their belief.

Sure, I can see self-fulfilling prophecies influcencing a share's price, but I doubt that's the only mechanism at play.

Why are company executives so obsessed about their company's shares, rather than shares of other companies?
Why don't any companies go about their business, completely ignoring the existence of their shares?


## What makes shares more than pieces of paper

The first question we should ask is what do shares have that pieces of paper don't? These things:

- **Dividends**. Dividends are payments made by a company to its shareholders.
If a company decides on a dividend of $10 and you hold 15 shares, the company will pay you $150 a year. 

- **Share buybacks**. That's when a company decides to buy its own shares back from the open market, making them disappear.

- **IPOs (initial public offerings)**. That's when a company decides to create new shares out of thin air and sell them.

- **Voting rights**. For each share you own, you get one vote on shareholder matters. Notably, you can elect board members. Board members are the people who control when the company does dividends, share buybacks, and IPOs. Board members also hire executives to run the company.

So how do these things affect share price?


## Majority shareholder incentives

Imagine you own 51% of a company's shares.
As a greedy human, how can you use this to make money?
Well, you have 51% of the vote, so you can control the board of directors by electing members that will do what you want.

You could tell the board to make the company give you a salary.
But it's usually illegal for the board to give you more favorable treatment
than other shareholders.
Additionally, high salaries are heavily taxed.

Instead, you tell the company to spend its income on dividends.
Since you own 51% of the shares, you'll get 51% of the dividends.

Equivalently, you can make the company spend its income on buybacks.
These reduce the number of shares, meaning your shares become a greater fraction of the total.
You can sell some shares to lower your fraction to its previous value.
This gets you money, which is the same end result as dividends.
Confusingly, buybacks are sometimes taxed even less than dividends.

Lastly, you are incentivized to make the board hire executives who will maximize profits so that more can be spent on dividends and buybacks.


## What about companies without dividends or buybacks?

As of 2025, some rapidly growing companies like Amazon haven't done any significant dividends or buybacks. Why?

{% image "amazon_shareholder_returns.svg", "A graph of Amazon shareholder returns.", 70 %}

Well, imagine again you're a majority shareholder.
If you believe the company can grow, you tell the board to direct all income towards expansion.
This increases future income, allowing even larger future dividends or buybacks.

Once the company can't grow any further, you tell the board to direct income towards dividends and buybacks.

Indeed, most companies eventually spend most of their net earnings on dividends and buybacks. According to [this data sheet](https://www.spglobal.com/spdji/en/documents/additional-material/sp-500-buyback.xlsx), in the 2018-2024 period, companies in the S&P 500 made a total of \$9,572.48 billion net income and spent \$9,315.65 billion of that on dividends and buybacks. It seems 97.32% of net income was spent on dividends and buybacks.

TODO: Graph of the average S&P 500 company?

However, unsustainably high dividends and buybacks will eventually bankrupt the company.


## Minority shareholder incentives

Majority shareholders use their control of the company to earn money through dividends and buybacks. But to their annoyance, these leak some money to minority shareholders.
If you own 1% of a company's shares, you get 1% of the benefit of dividends and buybacks.

Investors try to buy shares from companies with high earnings that can afford to eventually pay dividends and buybacks.
That's what causes share price to rise when a company's earnings rise.

Value investors like companies that have high earnings per share relative to how much shares cost. This is measured by "earnings yield":

$$
\text{Earnings yield}=\frac{\text{Earnings per Share}}{\text{Share price}}
$$

This is kind of like the expected interest rate of the share. Most TODO (stable PE ratio at 15ish)

## TODO TODO

TODO: Talk about "interest rate" and why company bonds are mediocre.





## Influencing public beliefs

As a majority shareholder, in addition to dividends and buybacks, you have another mechanism to make money:
convincing people to buy your company's shares, which raises their price.
To do this, you can tell the company to brag about rising profits.
You can also convince investors that dividend and buyback levels are sustainable in the long term.


## Summary

The majority shareholders can force the board to spend profits on dividends and buybacks, which are mechanisms of giving money to shareholders.
The higher the profits, the more can be spent on future dividends or buybacks.
This causes people to buy shares when they see profits rise, which drives up their price.
However, if dividend or buyback levels are unsustainable, investors will be weary to buy shares.
In addition price is also affected by social phenomena like self-fulfilling prophecies.
