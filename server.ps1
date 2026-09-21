$port = 8000
$path = "C:\STUDIOS FAAS\ceramica-china"
$l = New-Object System.Net.HttpListener
$l.Prefixes.Add("http://localhost:$port/")
$l.Start()
Write-Host "Servidor en http://localhost:$port/"
while ($l.IsListening) {
    $c = $l.GetContext()
    $r = $c.Request
    $s = $c.Response
    $f = $r.Url.LocalPath.TrimStart('/')
    if ([string]::IsNullOrEmpty($f)) { $f = "index.html" }
    $fp = Join-Path $path $f
    if (Test-Path $fp) {
        $ct = switch ([System.IO.Path]::GetExtension($f)) {
            '.html' { 'text/html' }
            '.css'  { 'text/css' }
            '.js'   { 'application/javascript' }
            default { 'application/octet-stream' }
        }
        $b = [System.IO.File]::ReadAllBytes($fp)
        $s.ContentType = $ct
        $s.OutputStream.Write($b, 0, $b.Length)
    } else {
        $s.StatusCode = 404
        $m = [System.Text.Encoding]::UTF8.GetBytes("404")
        $s.OutputStream.Write($m, 0, $m.Length)
    }
    $s.Close()
}
