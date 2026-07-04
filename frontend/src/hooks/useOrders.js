import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder, fetchMyOrders, deleteOrder } from '@/api/order';

export function useMyOrders(options = {}) {
  return useQuery({
    queryKey: ['myOrders'],
    queryFn: fetchMyOrders,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData) => createOrder(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myOrders'] });
    },
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId) => deleteOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myOrders'] });
    },
  });
}
