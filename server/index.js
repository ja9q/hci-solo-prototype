import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const addresses = [
  { alias: "John’s House", name: "John Doe", address: "123 ALPHABET STR, CITY, ZC, 11111-1111, United States", number: "+12223334444" },
  { alias: "Jane’s apartment", name: "Jane Doe", address: "234 NUMBERS AVE, CITY, ZC, 11111-1111, United States", number: "+13334442222" },
  { alias: "Dohn’s house", name: "Dohn Joe", address: "345 LETTERS COURT, CITY, ZC, 11111-1111, United States", number: "+14443332222" }
];
const payments = [
  { alias: "John (Visa)", name: "John Doe", label: "Visa ending in 1111", expiry: "MM/YYYY" },
  { alias: "Jane’s rewards card", name: "Jane Doe", label: "Mastercard ending in 2222", expiry: "MM/YYYY" },
  { alias: "Dohn’s Card", name: "Dohn Joe", label: "Amex ending in 3333", expiry: "MM/YYYY" }
];
const presets = [
  { address: addresses[0], payment: payments[0] },
  { address: addresses[1], payment: payments[1] },
  { address: addresses[2], payment: payments[2] }
];
function AddressPanel({ orderMode, setOrderMode, setModalOpen, address, setAddress }) {
  const options = addresses.map((a, i) => {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center", children: [
      /* @__PURE__ */ jsx("input", { id: `address-${i}`, type: "radio", checked: a == address, onChange: () => {
        {
          setAddress(a);
        }
      }, name: "address", className: "w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600" }),
      /* @__PURE__ */ jsxs("div", { className: "ml-3 w-200", children: [
        /* @__PURE__ */ jsxs("label", { htmlFor: `address-${i}`, children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold p-0 m-0", children: a.alias }),
          /* @__PURE__ */ jsx("p", { className: "p-0 m-0", children: a.name }),
          /* @__PURE__ */ jsx("p", { className: "p-0 m-0", children: a.address }),
          /* @__PURE__ */ jsxs("p", { className: "p-0 m-0", children: [
            "Phone number: ",
            a.number
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-blue-800 cursor-pointer p-0 m-0", children: "Edit Address | Add delivery instructions" })
      ] })
    ] });
  });
  return /* @__PURE__ */ jsx("div", { className: "bg-white w-250 p-5 ", children: orderMode == 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("span", { className: "flex flex-row  mb-5 gap-5 items-end", children: [
      /* @__PURE__ */ jsx("p", { className: "font-bold text-xl", children: "Select a delivery address" }),
      /* @__PURE__ */ jsx("p", { className: "text-blue-800 cursor-pointer pb-1", onClick: () => {
        setModalOpen(true);
      }, children: "Use order profile" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5 border-1 mb-5 border-white border-t-gray-300", children: [
      /* @__PURE__ */ jsx("p", { className: "font-bold text-lg pt-3 ", children: "Delivery addresses (3)" }),
      options,
      /* @__PURE__ */ jsx("p", { className: "text-blue-800 cursor-pointer", children: "Add a new delivery address" })
    ] }),
    /* @__PURE__ */ jsx("button", { onClick: () => {
      setOrderMode(2);
    }, className: " rounded-xl bg-amber-300 py-1 px-5 cursor-pointer hover:bg-amber-400", children: `Deliver to ${address.alias}` })
  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between", children: [
      /* @__PURE__ */ jsxs("p", { className: "font-bold text-xl", children: [
        "Paying with ",
        address.alias
      ] }),
      /* @__PURE__ */ jsx("p", { onClick: () => {
        setOrderMode(0);
      }, className: "text-blue-800 cursor-pointer", children: "Change" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-blue-800 cursor-pointer mt-5", children: "Add delivery instructions" })
  ] }) });
}
function OrderPanel({ orderMode, setOrderMode }) {
  return /* @__PURE__ */ jsx(Fragment, { children: orderMode == 2 ? /* @__PURE__ */ jsxs(Fragment, { children: [
    " ",
    /* @__PURE__ */ jsxs("div", { className: "bg-white w-250 p-5", children: [
      /* @__PURE__ */ jsx("p", { className: "font-bold text-xl", children: "Arriving Nov 15, 2025" }),
      /* @__PURE__ */ jsx("p", { children: "If you order in the next 15 hours and 22 minutes" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row mt-3 gap-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-3 w-150 flex flex-row bg-gray-200", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-col mr-5", children: [
            /* @__PURE__ */ jsx("div", { className: "w-40 h-40 bg-gray-50 mb-3" }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white w-30 border-yellow-300 border-5 rounded-4xl flex flex-row justify-between px-3 py-2", children: [
              /* @__PURE__ */ jsx("div", { className: "font-bold cursor-pointer", children: "-" }),
              /* @__PURE__ */ jsx("div", { className: "font-bold", children: "1" }),
              /* @__PURE__ */ jsx("div", { className: "font-bold cursor-pointer", children: "+" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-col", children: [
            /* @__PURE__ */ jsx("p", { children: "Product Name" }),
            /* @__PURE__ */ jsx("p", { className: "font-bold", children: "$0.00" }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 text-xs", children: "Ships from Amazon.com" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs", children: "Sold by Company" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "w-100 flex flex-row", children: [
            /* @__PURE__ */ jsx("input", { id: "ship-1", type: "radio", checked: true, name: "address", className: "w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600" }),
            /* @__PURE__ */ jsxs("label", { htmlFor: "ship-1", className: "ml-3 w-100 flex flex-row justify-between", children: [
              /* @__PURE__ */ jsx("div", { children: "Shipping Option 1" }),
              /* @__PURE__ */ jsx("div", { children: "FREE" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "w-100 flex flex-row", children: [
            /* @__PURE__ */ jsx("input", { id: "ship-2", type: "radio", name: "address", className: "w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600" }),
            /* @__PURE__ */ jsxs("label", { htmlFor: "ship-2", className: "ml-3 w-100 flex flex-row justify-between", children: [
              /* @__PURE__ */ jsx("div", { children: "Shipping Option 2" }),
              /* @__PURE__ */ jsx("div", { children: "FREE" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white w-250 p-5 center-items flex flex-row gap-7", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => {
        setOrderMode(2);
      }, className: "w-70 h-8 rounded-xl bg-amber-300 py-1 px-5 cursor-pointer hover:bg-amber-400", children: "Place your order" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xl font-bold", children: "Order total: $0.00" }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs", children: [
          "By placing your order, you agree to Amazon's ",
          /* @__PURE__ */ jsx("a", { className: "text-blue-800 cursor-pointer underline", children: "privacy notice" }),
          " and ",
          /* @__PURE__ */ jsx("a", { className: "text-blue-800 cursor-pointer underline", children: "conditions of use" })
        ] })
      ] })
    ] })
  ] }) : /* @__PURE__ */ jsxs("div", { className: "bg-white w-250 p-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between", children: [
      /* @__PURE__ */ jsx("p", { className: "font-bold text-xl", children: "Arriving Nov 15, 2025" }),
      /* @__PURE__ */ jsx("p", { onClick: () => {
        setOrderMode(2);
      }, className: "text-blue-800 cursor-pointer", children: "Change" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-5 mt-3", children: [
      /* @__PURE__ */ jsx("div", { className: "w-25 h-25 bg-gray-300" }),
      /* @__PURE__ */ jsx("p", { children: "Product Name" })
    ] })
  ] }) });
}
function PaymentPanel({ orderMode, setModalOpen, setOrderMode, payment, setPayment }) {
  const options = payments.map((p) => {
    return /* @__PURE__ */ jsxs("tr", { onClick: () => {
      {
        setPayment(p);
      }
    }, className: `${payment == p ? " bg-orange-100 " : ""}`, children: [
      /* @__PURE__ */ jsx("td", { className: "pl-5", children: /* @__PURE__ */ jsx("input", { type: "radio", checked: p == payment, onChange: () => {
        {
          setPayment(p);
        }
      }, name: "payment", className: "mt-2 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600" }) }),
      /* @__PURE__ */ jsx("td", { className: "w-13", children: /* @__PURE__ */ jsx("div", { className: "mt-1 h-6 w-10 bg-gray-400" }) }),
      /* @__PURE__ */ jsxs("td", { children: [
        /* @__PURE__ */ jsx("strong", { children: p.alias }),
        " ",
        /* @__PURE__ */ jsxs("em", { children: [
          "- (",
          p.label,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsx("td", { className: "py-3", children: p.name }),
      /* @__PURE__ */ jsx("td", { children: p.expiry })
    ] });
  });
  return /* @__PURE__ */ jsx("div", { className: "bg-white w-250 p-5", children: orderMode == 1 ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("span", { className: "flex flex-row  mb-5 gap-5 items-end", children: [
      /* @__PURE__ */ jsx("p", { className: "font-bold text-xl", children: "Select a delivery address" }),
      /* @__PURE__ */ jsx("p", { className: "text-blue-800 cursor-pointer pb-1", onClick: () => {
        setModalOpen(true);
      }, children: "Use order profile" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5 border-1 border-gray-300 p-3 rounded-xl mb-5", children: [
      /* @__PURE__ */ jsx("p", { className: "font-bold text-lg ", children: "Your credit and debit cards" }),
      /* @__PURE__ */ jsxs("table", { children: [
        /* @__PURE__ */ jsxs("tr", { className: "border-1 border-white border-b-gray-300 py-2  ", children: [
          /* @__PURE__ */ jsx("td", { className: "font-normal text-gray-600" }),
          /* @__PURE__ */ jsx("td", { className: "font-normal text-gray-600" }),
          /* @__PURE__ */ jsx("td", { className: "font-normal text-gray-600" }),
          /* @__PURE__ */ jsx("td", { className: "font-normal text-gray-600", children: "Name on card" }),
          /* @__PURE__ */ jsx("td", { className: "font-normal text-gray-600", children: "Expires on" })
        ] }),
        /* @__PURE__ */ jsx("tr", { className: "h-2" }),
        options
      ] })
    ] }),
    /* @__PURE__ */ jsx("button", { onClick: () => {
      setOrderMode(2);
    }, className: " rounded-xl bg-amber-300 py-1 px-5 cursor-pointer hover:bg-amber-400", children: `Pay with ${payment.alias}` })
  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between", children: [
      /* @__PURE__ */ jsxs("p", { className: "font-bold text-xl", children: [
        "Paying with ",
        payment.alias
      ] }),
      /* @__PURE__ */ jsx("p", { onClick: () => {
        setOrderMode(1);
      }, className: "text-blue-800 cursor-pointer", children: "Change" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-blue-800 cursor-pointer mt-5", children: "Use a gift card, voucher, or promo code" })
  ] }) });
}
function OrderSettings({ orderMode, setModalOpen, setOrderMode, address, payment, setAddress, setPayment }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-5", children: [
    /* @__PURE__ */ jsx(AddressPanel, { orderMode, setModalOpen, setOrderMode, address, setAddress }),
    /* @__PURE__ */ jsx(PaymentPanel, { orderMode, setModalOpen, setOrderMode, payment, setPayment }),
    /* @__PURE__ */ jsx(OrderPanel, { orderMode, setOrderMode, address, payment })
  ] });
}
function RightPanel({ orderMode, setOrderMode, address, payment }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white w-100 p-5 h-50", children: [
    orderMode == 0 && /* @__PURE__ */ jsxs("button", { onClick: () => {
      setOrderMode(2);
    }, className: "w-90 rounded-xl bg-amber-300 p-1 cursor-pointer hover:bg-amber-400", children: [
      "Deliver to ",
      address.alias
    ] }),
    orderMode == 1 && /* @__PURE__ */ jsxs("button", { onClick: () => {
      setOrderMode(2);
    }, className: "w-90 rounded-xl bg-amber-300 p-1 cursor-pointer hover:bg-amber-400", children: [
      "Pay with ",
      payment.alias
    ] }),
    orderMode == 2 && /* @__PURE__ */ jsx("button", { className: "w-90 rounded-xl bg-amber-300 p-1 cursor-pointer hover:bg-amber-400", children: "Place your order" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col mt-5 w-90 pt-5 border-1 border-white border-t-gray-300 text-xs gap-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex w-90 flex-row justify-between", children: [
        /* @__PURE__ */ jsx("div", { children: "Items:" }),
        /* @__PURE__ */ jsx("div", { children: "$0.00" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex w-90 flex-row justify-between", children: [
        /* @__PURE__ */ jsx("div", { children: "Shipping & handling:" }),
        /* @__PURE__ */ jsx("div", { children: "$0.00" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex w-90 flex-row justify-between", children: [
        /* @__PURE__ */ jsx("div", { children: " Estimated tax to be collected:" }),
        /* @__PURE__ */ jsx("div", { children: "$0.00" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex w-90 flex-row justify-between text-lg font-bold", children: [
        /* @__PURE__ */ jsx("div", { children: " Order total:" }),
        /* @__PURE__ */ jsx("div", { children: "$0.00" })
      ] })
    ] })
  ] });
}
function Modal({ modalOpen, setModalOpen, setOrderMode, setAddress, setPayment }) {
  const [preset, setPreset] = useState(presets[0]);
  function handleModalClick() {
    setAddress(preset.address);
    setPayment(preset.payment);
    setOrderMode(2);
    setModalOpen(false);
  }
  const options = presets.map((p, i) => {
    return /* @__PURE__ */ jsxs("tr", { className: `flow flow-row items-top ${p == preset && "bg-orange-100"}`, onClick: () => {
      setPreset(p);
    }, children: [
      /* @__PURE__ */ jsx("td", { className: "pl-3", children: /* @__PURE__ */ jsx("input", { id: `preset-${i}`, type: "radio", name: "preset", checked: p == preset, className: " w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600" }) }),
      /* @__PURE__ */ jsxs("td", { className: "py-2", children: [
        /* @__PURE__ */ jsx("p", { className: "font-bold p-0 m-0", children: p.address.alias }),
        /* @__PURE__ */ jsx("p", { className: "p-0 m-0", children: p.address.name }),
        /* @__PURE__ */ jsx("p", { className: "p-0 m-0", children: p.address.address })
      ] }),
      /* @__PURE__ */ jsxs("td", { className: "py-2", children: [
        /* @__PURE__ */ jsx("p", { className: "font-bold p-0 m-0", children: p.payment.alias }),
        /* @__PURE__ */ jsx("p", { className: "p-0 m-0", children: p.payment.name }),
        /* @__PURE__ */ jsx("p", { className: "p-0 m-0 italic", children: p.payment.label })
      ] })
    ] });
  });
  return /* @__PURE__ */ jsx(Fragment, { children: modalOpen && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in", onClick: () => {
    setModalOpen(false);
  }, children: /* @__PURE__ */ jsx("div", { className: "flex py-50 justify-center text-sm", children: /* @__PURE__ */ jsxs("div", { className: " w-220 rounded-lg bg-white  p-4 sm:p-6 sm:pb-4", onClick: (e) => {
    e.stopPropagation();
  }, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsx("p", { className: "font-bold text-lg mb-5", children: "Use order profile" }),
      /* @__PURE__ */ jsx("p", { className: "cursor-pointer", onClick: () => {
        setModalOpen(false);
      }, children: "✕" })
    ] }),
    /* @__PURE__ */ jsx("table", { className: "w-205", children: options }),
    /* @__PURE__ */ jsx("p", { className: "text-blue-800 cursor-pointer my-5", children: "Add a new order profile" }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-row justify-end", children: /* @__PURE__ */ jsx("button", { onClick: handleModalClick, className: " text-sm rounded-xl bg-amber-300 py-1 px-5 cursor-pointer hover:bg-amber-400", children: "Use order profile" }) })
  ] }) }) }) }) });
}
function Welcome() {
  const [orderMode, setOrderMode] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [address, setAddress] = useState(addresses[0]);
  const [payment, setPayment] = useState(payments[0]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Modal, { modalOpen, setModalOpen, setOrderMode, setAddress, setPayment }),
    /* @__PURE__ */ jsx("header", { className: "flex flex-col items-center min-w-max bg-gray-900 p-4 mb-5", children: /* @__PURE__ */ jsx("p", { className: "leading-6 text-gray-200 text-xl text-center", children: "Secure checkout" }) }),
    /* @__PURE__ */ jsxs("main", { className: "flex  justify-center pb-4 gap-10 text-sm", children: [
      /* @__PURE__ */ jsx(OrderSettings, { orderMode, setModalOpen, setOrderMode, address, payment, setAddress, setPayment }),
      /* @__PURE__ */ jsx(RightPanel, { orderMode, setOrderMode, address, payment })
    ] })
  ] });
}
function meta({}) {
  return [{
    title: "Final Prototype"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(Welcome, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BwxNzArz.js", "imports": ["/assets/chunk-UIGDSWPH-DcDWgLby.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-Br7BZHnd.js", "imports": ["/assets/chunk-UIGDSWPH-DcDWgLby.js"], "css": ["/assets/root-CZGOC_4U.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-CADXI6zo.js", "imports": ["/assets/chunk-UIGDSWPH-DcDWgLby.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-e9d86aa5.js", "version": "e9d86aa5", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
