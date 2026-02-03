
import { Scenario } from './types';

export const SCENARIOS: Scenario[] = [
  {
    id: "anz-banking",
    industry: "Banking",
    inboxFromName: "ANZ Alerts",
    inboxSubject: "Your ANZ monthly statement is ready",
    inboxPreview: "Dear customer, your statement for the period...",
    variants: {
      A: {
        templateUrl: "https://21831415.fs1.hubspotusercontent-na1.net/hubfs/21831415/Fact%20or%20Phishing%20Email%20Sims/banking-fact.png",
        fromName: "ANZ Alerts",
        fromEmail: "alerts@anz.com.au",
        subject: "Your ANZ monthly statement is ready",
        textAlternative: "Legitimate ANZ statement notification."
      },
      B: {
        templateUrl: "https://21831415.fs1.hubspotusercontent-na1.net/hubfs/21831415/Fact%20or%20Phishing%20Email%20Sims/banking-phishing.png",
        fromName: "ANZ Security Team",
        fromEmail: "security@anz-banking-verification.net",
        subject: "URGENT: Suspicious activity on your ANZ account",
        textAlternative: "Phishing attempt using fake ANZ security alert."
      }
    },
    phishingVariant: "B",
    successReasons: [
      "The phishing sender uses a non-official .net domain instead of anz.com.au",
      "Artificial urgency in the subject line is a classic phishing red flag"
    ],
    failureHints: [
      "Check the sender address carefully: legitimate ANZ emails come from anz.com.au",
      "Is the tone professional or is it trying to scare you into clicking?"
    ]
  },
  {
    id: "bunnings-trade",
    industry: "Trade",
    inboxFromName: "Bunnings Warehouse",
    inboxSubject: "Bunnings Warehouse: New catalogue & PowerPass offers",
    inboxPreview: "Check out the latest deals at Bunnings...",
    variants: {
      A: {
        templateUrl: "https://21831415.fs1.hubspotusercontent-na1.net/hubfs/21831415/Fact%20or%20Phishing%20Email%20Sims/trade-fact.png",
        fromName: "Bunnings Warehouse",
        fromEmail: "news@bunnings.com.au",
        subject: "Bunnings Warehouse: New catalogue & PowerPass offers",
        textAlternative: "Official Bunnings newsletter."
      },
      B: {
        templateUrl: "https://21831415.fs1.hubspotusercontent-na1.net/hubfs/21831415/Fact%20or%20Phishing%20Email%20Sims/trade-phishing.png",
        fromName: "Bunnings Rewards",
        fromEmail: "prizes@bunnings-voucher-win.biz",
        subject: "YOU WON! Claim your $500 Bunnings Voucher now",
        textAlternative: "Fake voucher scam using Bunnings branding."
      }
    },
    phishingVariant: "B",
    successReasons: [
      "Official Bunnings emails will never use a .biz TLD",
      "The 'too good to be true' offer of a $500 voucher is typical of credential harvesting"
    ],
    failureHints: [
      "Check the domain: bunnings-voucher-win.biz is not an official Bunnings site",
      "Retailers rarely give away large vouchers without a specific, documented competition"
    ]
  },
  {
    id: "aus-post",
    industry: "Post",
    inboxFromName: "Australia Post",
    inboxSubject: "Your Australia Post delivery update",
    inboxPreview: "We are tracking your item 0923-XJ99...",
    variants: {
      A: {
        templateUrl: "https://21831415.fs1.hubspotusercontent-na1.net/hubfs/21831415/Fact%20or%20Phishing%20Email%20Sims/mail-fact.png",
        fromName: "Australia Post",
        fromEmail: "notifications@australiapost.com.au",
        subject: "Your Australia Post delivery update",
        textAlternative: "Official parcel tracking update."
      },
      B: {
        templateUrl: "https://21831415.fs1.hubspotusercontent-na1.net/hubfs/21831415/Fact%20or%20Phishing%20Email%20Sims/mail-phishing.png",
        fromName: "AusPost Tracking",
        fromEmail: "admin@australia-post-redelivery.net",
        subject: "Action Required: Your parcel delivery was unsuccessful",
        textAlternative: "Phishing attempt claiming a delivery failure."
      }
    },
    phishingVariant: "B",
    successReasons: [
      "Mismatched domain: australia-post-redelivery.net is not the official australiapost.com.au",
      "Generic 'Action Required' phrasing used to induce panic"
    ],
    failureHints: [
      "Check the sender's email domain closely for small variations",
      "Australia Post typically uses your name if you have a MyPost account"
    ]
  }
];
