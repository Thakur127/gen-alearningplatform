import React from "react";
import { useQuery } from "react-query";
import useGetUser from "../../hooks/useGetUser";
import axiosInstance from "../../api/axios";
import getSymbolFromCurrency from "currency-symbol-map";
import { Link } from "react-router-dom";
import { Skeleton, Stack } from "@chakra-ui/react";

const TransactionHistoryPage = () => {
  const { data: user } = useGetUser();

  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transaction-history", user],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/payments/transactions/");
      return data;
    },
    enabled: !!user,
  });

  return (
    <div className="container py-4 lg:px-16">
      <h1 className="text-xl lg:text-3xl font-semibold">Transaction History</h1>
      <div className="my-4 space-y-2 lg:space-y-4">
        {transactions?.map((transaction, idx) => {
          return (
            <div
              key={idx}
              className={`flex justify-between p-2 px-4 lg:p-4 rounded-md relative ${
                transaction?.payment_status === "paid"
                  ? "bg-green-100/80"
                  : "bg-red-100/80"
              }`}
            >
              <Link
                to={`/transaction/${transaction?.transaction_id}`}
                className="absolute h-full w-full top-0 left-0"
              ></Link>
              <section>
                <h2 className="lg:text-xl font-medium">
                  {transaction?.course.title}
                </h2>
                <span className="text-xs lg:text-sm font-gray-500">
                  {new Date(transaction?.created_at).toUTCString()}
                </span>
              </section>
              <section
                className={`${
                  transaction?.payment_status === "paid"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {getSymbolFromCurrency(transaction?.currency)}
                {transaction?.amount}
              </section>
            </div>
          );
        })}
      </div>
      <div>
        {!transactions ||
          (transactions?.length === 0 && "No Transaction has done yet.")}
        {!transactions && (
          <Stack>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((key) => {
              return <Skeleton key={key} height={"95px"} rounded={"md"} />;
            })}
          </Stack>
        )}
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
