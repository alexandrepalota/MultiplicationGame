package microservices.book.multiplication.challenge;

import microservices.book.multiplication.user.User;
import org.springframework.stereotype.Service;

@Service
public class ChallengeServiceImpl implements ChallengeService {

    @Override
    public ChallengeAttempt verifyAttempt(ChallengeAttemptDTO attemptDTO) {
        // Check if the attempt is correct
        boolean isCorrect = attemptDTO.getGuess() == attemptDTO.getFactorA() * attemptDTO.getFactorB();

        User user = new User(null, attemptDTO.getUserAlias());
        ChallengeAttempt checkedAttempt = new ChallengeAttempt(null, user, attemptDTO.getFactorA(),
                attemptDTO.getFactorB(), attemptDTO.getGuess(), isCorrect);

        return checkedAttempt;
    }
}
