import { type ResponsePagination, type RequestPagination } from '@/shared/domain';
import { type DefinedUseQueryResult, useQuery } from '@tanstack/react-query';
import { type InvestmentResponse, type InvestmentFilter } from '../../domain';
import { PAGINATED_SEARCH } from './QueryKeys';
import { InvestmentRepository } from '../../infrastructure';

const usePaginatedSearchMineralType = (
	searchFilter: RequestPagination<InvestmentFilter>,
): DefinedUseQueryResult<ResponsePagination<InvestmentResponse>, Error> => {
	return useQuery({
		queryKey: [PAGINATED_SEARCH, searchFilter],
		queryFn: async () => await InvestmentRepository.paginatedSearch(searchFilter),
		retry: 0,
		refetchOnWindowFocus: false,
		initialData: {
			from: 0,
			to: 0,
			perPage: 0,
			currentPage: 0,
			lastPage: 0,
			total: 0,
			data: [],
		},
	});
};

export default usePaginatedSearchMineralType;