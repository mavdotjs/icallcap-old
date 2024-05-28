<script>
    import { page } from "$app/stores"
    import { goto } from "$app/navigation"
    const token = new URLSearchParams($page.url.hash.slice(1)).get("access_token");
    goto(`/auth/callback/${token}`)
</script>