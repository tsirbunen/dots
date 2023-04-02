export const pollWithThisVoterVotesSql = `
SELECT json_build_object(
    'code',
    OUTERSUB."code",
    'id',
    OUTERSUB."id",
    'question',
    OUTERSUB."question",
    'isAnonymous',
    OUTERSUB."isAnonymous",
    'totalVotesCountMax',
    OUTERSUB."totalVotesCountMax",
    'optionVotesCountMax',
    OUTERSUB."optionVotesCountMax",
    'showStatusWhenVoting',
    OUTERSUB."showStatusWhenVoting",
    'createdAt',
    OUTERSUB."createdAt",
    'updatedAt',
    OUTERSUB."updatedAt",
    'deletedAt',
    OUTERSUB."deletedAt",
    'state',
    OUTERSUB."state",
    'ownerId',
    OUTERSUB."ownerId",
    'options',
    OUTERSUB."options"
) AS poll
FROM (
    SELECT SUB."code",
        SUB."id",
        SUB."question",
        SUB."isAnonymous",
        SUB."totalVotesCountMax",
        SUB."optionVotesCountMax",
        SUB."showStatusWhenVoting",
        SUB."state",
        SUB."ownerId",
        SUB."createdAt",
        SUB."updatedAt",
        SUB."deletedAt",
        json_agg(
            json_build_object(
                'id',
                SUB."optionid",
                'pollId',
                SUB."pollId",
                'content',
                SUB."content",
                'votes',
                SUB."votes",
                'dataClass',
                SUB."dataClass",
                'createdAt',
                SUB."ocreatedat",
                'updatedAt',
                SUB."oupdatedat",
                'deletedAt',
                SUB."odeletedat"
            )
        ) AS options
    FROM (
            SELECT p.*,
                o."id" AS optionid,
                o."pollId",
                o."content",
                o."dataClass",
                o."createdAt" AS ocreatedat,
                o."updatedAt" As oupdatedat,
                o."deletedAt" AS odeletedat,
                COALESCE(
                    json_agg(
                        v.*
                    ) FILTER (
                        WHERE v.* IS NOT NULL
                    ),
                    '[]'
                ) AS votes
            FROM "Polls" p
                INNER JOIN "Options" o ON o."pollId" = p."id"
                LEFT JOIN "Votes" v ON v."optionId" = o."id"
                AND v."voterId" = ?
                WHERE p."id" = ?
            GROUP BY p."code",
                p."id",
                p."question",
                p."isAnonymous",
                p."totalVotesCountMax",
                p."optionVotesCountMax",
                o."id",
                p."showStatusWhenVoting",
                p."state",
                p."ownerId",
                p."createdAt",
                p."updatedAt",
                p."deletedAt",
                v."optionId"
        ) AS SUB
    GROUP BY SUB."code",
        SUB."id",
        SUB."question",
        SUB."isAnonymous",
        SUB."totalVotesCountMax",
        SUB."optionVotesCountMax",
        SUB."showStatusWhenVoting",
        SUB."state",
        SUB."ownerId",
        SUB."createdAt",
        SUB."updatedAt",
        SUB."deletedAt"
) AS OUTERSUB;
`
