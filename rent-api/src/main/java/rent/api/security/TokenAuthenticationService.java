package rent.api.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import rent.api.utils.Constants;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.Date;

@Service
public class TokenAuthenticationService {
    private static final Logger log = LoggerFactory.getLogger(TokenAuthenticationService.class);

    private static final long EXPIRATION_TIME = 864_000_000; // 10 days
    private static final String SECRET = "ed748327-9432-4cbb-a35f-bc2bc823cba3";
    private static final String TOKEN_PREFIX = "Bearer";

    static void addAuthentication(HttpServletResponse res, String username) {
        String JWT = Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
        res.addHeader(Constants.HEADER_AUTHORIZATION, TOKEN_PREFIX + " " + JWT);
    }

    static Authentication getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(Constants.HEADER_AUTHORIZATION);
        if (token != null) {
            try {
                // parse the token.
                String user = Jwts.parser()
                        .setSigningKey(SECRET)
                        .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                        .getBody()
                        .getSubject();
                return user != null ?
                        new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList()) :
                        null;
            } catch (MalformedJwtException | SignatureException e) {
                log.error(e.getMessage());
            }
        }
        return null;
    }
}
