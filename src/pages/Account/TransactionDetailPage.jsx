import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { Container } from "@chakra-ui/react";

const TransactionDetailPage = () => {
  const { transaction_id } = useParams();

  const { data: transaction } = useQuery({
    queryKey: ["transaction-detail", transaction_id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        "/payments/transaction/" + transaction_id
      );
      console.log(data);
      return data;
    },
    enabled: !!transaction_id,
  });

  return (
    <Container className="container py-4">TransactionDetailPage</Container>
  );
};

export default TransactionDetailPage;
