/** @format */
"use client";

import React, { useState } from "react";
import { Monitor, CreditCard, Bell, Mail, Shield, Plus } from "lucide-react";

const ProfileSettingsContent = () => {
  const [businessName, setBusinessName] = useState("FitGear Store");
  const [vatNumber, setVatNumber] = useState("DFGG5560 56605 565");
  const [businessAddress, setBusinessAddress] = useState(
    "Street Name, NY, USA",
  );

  const [emailOnSell, setEmailOnSell] = useState(true);
  const [pushOnBid, setPushOnBid] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(false);

  return (
    <div className="w-full px-2 md:px-4 xl:px-6 mb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Left Title */}
        <div className="lg:w-56 shrink-0">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary italic font-serif">
            Profile & Settings
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your buyer communications
          </p>
        </div>

        {/* Right Content */}
        <div className="flex-1 space-y-8">
          {/* Business Information */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                <Monitor className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-primary uppercase tracking-wide">
                      BUSINESS INFORMATION
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Update your business details and verification status.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-green-500 border border-green-200 px-2 py-0.5 rounded-full hidden sm:inline">
                    Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-primary block mb-1.5">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-primary block mb-1.5">
                    VAT Number
                  </label>
                  <input
                    type="text"
                    value={vatNumber}
                    onChange={(e) => setVatNumber(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-primary block mb-1.5">
                  Business address
                </label>
                <textarea
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
                <p className="text-xs text-muted-foreground text-right mt-1">
                  0/80
                </p>
              </div>
            </div>
          </div>

          {/* Bank Payout Details */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-primary uppercase tracking-wide">
                  BANK PAYOUT DETAILS
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Manage your payout preferences & connected accounts.
                </p>
              </div>
            </div>

            {/* Connected Bank */}
            <div className="bg-gray-50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded">
                  BANK
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">
                    Barclays Bank UK
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Account ending in *******26645
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-green-500">
                  Connected
                </span>
                <button className="text-xs font-bold text-red-500 hover:underline uppercase cursor-pointer">
                  DISCONNECT
                </button>
              </div>
            </div>

            <button className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline cursor-pointer">
              <Plus className="w-4 h-4" /> ADD ANOTHER PAYMENT METHOD
            </button>
          </div>

          {/* Notification Settings */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 sm:p-8">
            <div className="mb-6">
              <h2 className="text-sm font-bold text-primary uppercase tracking-wide">
                NOTIFICATIONS SETTINGS
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Choose how you want to be notified about your business
                activities.
              </p>
            </div>

            <div className="space-y-5">
              {/* Toggle: Email on sell */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <Mail className="w-5 h-5 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-primary">
                      Email when item sells
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      Get notified via email when one of your item is sold
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setEmailOnSell(!emailOnSell)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition shrink-0 cursor-pointer ${
                    emailOnSell ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      emailOnSell ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Toggle: Push on bid */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <Bell className="w-5 h-5 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-primary">
                      Push notifications for new bids
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      Receive instant push notifications when someone bids on
                      your item
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setPushOnBid(!pushOnBid)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition shrink-0 cursor-pointer ${
                    pushOnBid ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      pushOnBid ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Toggle: Weekly summary */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <Shield className="w-5 h-5 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-primary">
                      Weekly sales summary
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      Get notified via email when one of your item is sold
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setWeeklySummary(!weeklySummary)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition shrink-0 cursor-pointer ${
                    weeklySummary ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      weeklySummary ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsContent;
