import React, { useContext } from 'react';
import { AuthContext } from '../../Authentication/AuthContext';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecureAPI from '../../CustomHooks/UseAxiosSecureAPI';
import siteLogo from '../../assets/siteLogo.png';
import { IoCloudDownload } from "react-icons/io5";
// import { useReactToPrint } from "react-to-print";
// import { useRef } from "react";
import { ReTitleProvider } from 're-title';


const InvoicePage = () => {
    const currentDate = new Date().toLocaleDateString();
    const { user } = useContext(AuthContext);
    const axiosApi = UseAxiosSecureAPI();
    //   const { toPDF, targetRef } = usePDF({ filename: 'invoice.pdf' });

        
    // const contentRef = useRef<HTMLDivElement>(null);
    // const reactToPrintFn = useReactToPrint({
    //     content: () => contentRef.current,
    // });

    const { data: purchasedItems = [] } = useQuery({
        queryKey: ["cart", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
        const res = await axiosApi.get(`/myCart?email=${user.email}`);
        return res.data;
        },
    });

  const grandTotal = purchasedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <ReTitleProvider defaultTitle='Invoice Page'>
      <div className="max-w-4xl mx-auto p-8 shadow-lg mt-10 rounded-2xl"
      style={{ color: 'rgb(8, 12, 59)' }}>
        {/* Download Button */}
        <div className="flex justify-end mb-4">
          <button
              // onClick={() => toPDF()}
              // onClick={reactToPrintFn}
            className="cursor-pointer font-bold text-2xl flex gap-3 justify-center items-center px-6 py-2 rounded-xl transition"
            style={{
              backgroundColor: 'rgb(152, 161, 188)',
              color: 'rgb(8, 12, 59)'
            }}
          >
            <IoCloudDownload />
            Download PDF
          </button>
        </div>

        <div>
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-6">
            <div>
              <img src={siteLogo} alt="Website Logo" className="h-20" />
              <h2 className="text-xl font-bold mt-2">Aroggo Medicine Store</h2>
            </div>
            <div className="text-right">
              <h3 className="text-lg font-semibold">Invoice</h3>
              <p>Date: {currentDate}</p>
              <p>Invoice #: {Math.floor(Math.random() * 1000000)}</p>
            </div>
          </div>

          {/* User Info */}
          <div className="mt-6 border-b pb-4">
            <h4 className="text-2xl font-semibold mb-1">Billed To:</h4>
            <p className='text-xl'>{user?.displayName || "N/A"}</p>
            <p className='text-xl'>{user?.email}</p>
          </div>

          {/* Medicine Table */}
          <div className="mt-6">
            <table className="w-full table table-zebra text-2xl table-auto border-collapse">
              <thead>
                <tr style={{ backgroundColor: 'rgb(152, 161, 188)', color: 'rgb(8, 12, 59)' }}>
                  <th className="text-2xl p-3">Medicine</th>
                  <th className="text-2xl p-3">Company</th>
                  <th className="text-2xl p-3">Quantity</th>
                  <th className="text-2xl p-3">Unit Price</th>
                  <th className="text-2xl p-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {purchasedItems.map((item, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.company}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">৳{item.price}</td>
                    <td className="p-3">৳{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="text-right mt-6">
            <h4 className="text-xl font-bold">Grand Total: ৳{grandTotal}</h4>
          </div>

          {/* Footer */}
          <div className="mt-10 border-t pt-4 text-sm text-center" style={{ color: 'rgb(107, 114, 128)' }}>
            <p>Thank you for purchasing from Aroggo!</p>
            <p>Please keep this invoice for your records.</p>
          </div>
        </div>
      </div>
    </ReTitleProvider>
  );
};

export default InvoicePage;
